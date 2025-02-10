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
import useRollyStore from "@/application/state/useRollyStore";

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
  const { id: rollyId, typeId } = useRollyStore();

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

  const updatePostit = (postit: { id: number; name: string }) => {
    setSelectedPostit(postit);
  };
  const updateFont = (font: { id: number; font: string; name: string }) => {
    setSelectedFont(font);
  };

  const updateMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleMainButton = () => {
    if (typeId === 1) {
      toggleEmailModal();
    } else if (typeId === 2) {
      togglePostitModal();
    }
  };

  const handleEmailConfirm = (formData?: FormData) => {
    if (formData && formData.modal_text) {
      setEmail(formData.modal_text);
    }
    toggleEmailModal();
    setTimeout(() => {
      togglePostitModal();
    }, 100);
  };

  const handleEmailCancel = () => {
    toggleEmailModal();
    setTimeout(() => {
      togglePostitModal();
    }, 100);
  };

  const handlePostitModal = async () => {
    try {
      const email = useEmailStore.getState().email;
      await fetch("/api/postits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rollyId: rollyId,
          content: message,
          writerEmail: email,
          postitThemeId: selectedPostit.id,
          fontFamilyId: selectedFont.id,
        }),
      });

      togglePostitModal();
      router.push(`/(anon)/rollies/${rollyId}`);
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
          className={`${styles["textArea"]} ${selectedFont.name}`}
          placeholder="메시지를 작성하세요"
          maxLength={100}
          rows={6}
          cols={50}
          value={message}
          onChange={updateMessage}
        />
      </div>
      <BottomSheet>
        <ScrollContainer>
          {fonts.map((font, index) => (
            <ItemBox key={index} variant="text">
              <div
                onClick={() => updateFont(font)}
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
                onClick={() => updatePostit(postit)}
              />
            </ItemBox>
          ))}
        </ScrollContainer>
        <MainButton
          text={"완료"}
          onClick={() => handleMainButton()}
          disabled={!message.trim()}
        />
      </BottomSheet>

      <Modal
        contents={[
          {
            title: "답장을 받고 싶다면 이메일 주소를 입력해주세요",
            body: "답장을 원하지 않으면 취소 버튼을 눌러주세요",
            input: "text",
            maxLength: 30,
          },
        ]}
        onConfirm={handleEmailConfirm}
        onCancel={handleEmailCancel}
        isOpen={isEmailModalOpen}
      />
      <Modal
        contents={[
          {
            title: "메시지를 저장하시겠어요?",
            body: "저장 후에는 내용을 수정할 수 없어요!",
          },
        ]}
        onConfirm={handlePostitModal}
        onCancel={togglePostitModal}
        isOpen={isPostitModalOpen}
      />
    </div>
  );
};

export default Index;
