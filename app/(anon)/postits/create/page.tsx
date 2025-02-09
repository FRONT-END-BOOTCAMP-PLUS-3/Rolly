"use client";
import BottomSheet from "@/components/bottomSheet/BottomSheet";
import ItemBox from "@/components/itemBox/ItemBox";
import MainButton from "@/components/mainButton/MainButton";
import ScrollContainer from "@/components/scrollContainer/ScrollContainer";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import Header from "@/components/header/Header";
import BackButton from "@/components/backButton/BackButton";
import useToggle from "@/hooks/useToggle";
import Modal from "@/components/modal/Modal";
import useEmailStore from "@/application/state/useEmailStore";
import { FormData } from "@/components/modal/Modal.type";
import { useRouter } from "next/navigation";

const Index = () => {
  const router = useRouter();
  const [selectedPostit, setSelectedPostit] = useState<{
    id: number;
    name: string;
  }>({ id: 0, name: "" });
  const [selectedFont, setSelectedFont] = useState<{
    id: number;
    font: string;
    name: string;
  }>({ id: 0, font: "", name: "" });
  const [postits, setPostits] = useState<{ id: number; name: string }[]>([]);
  const [fonts, setFonts] = useState<
    { id: number; font: string; name: string }[]
  >([]);
  const [message, setMessage] = useState<string>("");
  const [isEmailModalOpen, toggleEmailModal] = useToggle(false);
  const [isPostitModalOpen, togglePostitModal] = useToggle(false);
  const { setEmail } = useEmailStore();
  const type = 1;
  const rollyId = 7;

  useEffect(() => {
    const fetchPostits = async () => {
      try {
        const response = await fetch("/api/postitthemes/");
        if (!response.ok) {
          throw new Error("Failed to fetch postits");
        }
        const data = await response.json();

        if (!data.success || !data.data) {
          throw new Error("Invalid response format");
        }

        const postits = data.data.map((item: { id: number; name: string }) => ({
          id: item.id,
          name: item.name,
        }));

        setPostits(postits);
        if (postits.length > 0) {
          setSelectedPostit(postits[0]);
        }
      } catch (error) {
        console.error("Error fetching postits:", error);
      }
    };
    const fetchFonts = async () => {
      try {
        const response = await fetch("/api/fontfamilies/");
        if (!response.ok) {
          throw new Error("Failed to fetch fonts");
        }
        const data = await response.json();
        if (!data.success || !data.data) {
          throw new Error("Invalid response format");
        }
        const fonts = data.data.map(
          (item: { id: number; font: string; name: string }) => ({
            id: item.id,
            font: item.font,
            name: item.name,
          })
        );
        setFonts(fonts);
        if (fonts.length > 0) {
          setSelectedFont(fonts[0]);
        }
      } catch (error) {
        console.error("Error fetching fonts:", error);
      }
    };
    fetchFonts();
    fetchPostits();
  }, []);

  const handlePostitClick = (postit: { id: number; name: string }) => {
    setSelectedPostit(postit);
  };
  const handleFontClick = (font: {
    id: number;
    font: string;
    name: string;
  }) => {
    setSelectedFont(font);
  };

  const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleMainButton = () => {
    if (type === 1) {
      toggleEmailModal();
    } else if (type === 2) {
      togglePostitModal();
    }
  };

  const handleEmail = (formData?: FormData) => {
    if (formData && formData.modal_text) {
      setEmail(formData.modal_text);
    }
    toggleEmailModal();
    setTimeout(() => {
      togglePostitModal();
    }, 100);
  };

  const handlePostit = async () => {
    try {
      const email = useEmailStore.getState().email;
      console.log(email);
      console.log(selectedFont, selectedPostit);
      const postitId = selectedPostit.id;
      const fontId = selectedFont.id;
      console.log(postitId, fontId);
      await fetch("/api/postits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rollyId: rollyId,
          content: message,
          writerEmail: email,
          postitThemeId: postitId,
          fontFamilyId: fontId,
        }),
      });

      togglePostitModal();
      router.push(`/member/rollies/${rollyId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header leftContent={<BackButton />} title={"메세지 작성"} />

      <div className={styles["textField"]}>
        <img
          src={`/images/postit-theme/${selectedPostit.name}.svg`}
          className={styles["postit-theme-bg"]}
        />
        <textarea
          className={styles["textArea"]}
          placeholder="메시지를 작성하세요"
          maxLength={100}
          rows={6}
          cols={50}
          style={{
            fontFamily: selectedFont.name,
          }}
          value={message}
          onChange={handleMessage}
        />
      </div>
      <BottomSheet>
        <ScrollContainer>
          {fonts.map((font, index) => (
            <ItemBox key={index} variant="text">
              <div
                onClick={() => handleFontClick(font)}
                style={{ fontFamily: font.name }}
              >
                {font.font}
              </div>
            </ItemBox>
          ))}
        </ScrollContainer>
        <ScrollContainer>
          {postits.map((postit, index) => (
            <ItemBox key={index} variant="image">
              <img
                src={`/images/postit-theme/${postit.name}.svg`}
                alt={`postit-${postit.name}`}
                onClick={() => handlePostitClick(postit)}
              />
            </ItemBox>
          ))}
        </ScrollContainer>
        <MainButton
          text={"다음"}
          onClick={handleMainButton}
          disabled={!message.trim()}
        />
      </BottomSheet>

      <Modal
        contents={[
          {
            title: "답장을 받고 싶다면 이메일 주소를 입력해주세요",
            input: "text",
            maxLength: 30,
          },
        ]}
        onConfirm={handleEmail}
        onCancel={toggleEmailModal}
        isOpen={isEmailModalOpen}
      />
      <Modal
        contents={[
          {
            title: "메시지를 저장하시겠어요?",
            body: "저장 후에는 내용을 수정할 수 없어요!",
          },
        ]}
        onConfirm={handlePostit}
        onCancel={togglePostitModal}
        isOpen={isPostitModalOpen}
      />
    </div>
  );
};

export default Index;
