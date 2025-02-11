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
import { FormData } from "@/components/modal/Modal.type";
import { useRouter } from "next/navigation";
import useRollyStore from "@/application/state/useRollyStore";
import { PostitThemeDto } from "@/application/usecases/postitTheme/dto/PostitThemeDto";
import { FontFamilyDto } from "@/application/usecases/fontFamily/dto/FontFamilyDto";

const CreatePostits = () => {
  const router = useRouter();
  const [selectedPostitTheme, setSelectedPostitTheme] = useState<{
    id: number;
    name: string;
  }>({ id: 0, name: "" });
  const [selectedFontFamily, setSelectedFontFamily] = useState<{
    id: number;
    font: string;
    name: string;
  }>({ id: 0, font: "", name: "" });
  const [postitThemeList, setPostitThemeList] = useState<PostitThemeDto[]>([]);
  const [fontFamilyList, setFontFamilyList] = useState<FontFamilyDto[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isEmailModalOpen, toggleEmailModal] = useToggle(false);
  const [isPostitModalOpen, togglePostitModal] = useToggle(false);
  const [email, setEmail] = useState<string>("");
  const { id: rollyId, typeId } = useRollyStore();
  const [isBackModalOpen, toggleBackModal] = useToggle(false);

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

        setPostitThemeList(data.data);
        if (data.data.length > 0) {
          setSelectedPostitTheme(data.data[0]);
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
        setFontFamilyList(data.data);
        if (data.data.length > 0) {
          setSelectedFontFamily(data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching fonts:", error);
      }
    };
    fetchFonts();
    fetchPostits();
  }, []);

  const updatePostit = (postit: { id: number; name: string }) => {
    setSelectedPostitTheme(postit);
  };
  const updateFont = (font: { id: number; font: string; name: string }) => {
    setSelectedFontFamily(font);
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

  const handleEmailModal = (formData?: FormData) => {
    if (formData && formData.modal_text) {
      setEmail(formData.modal_text);
    }
    toggleEmailModal();
    setTimeout(() => {
      togglePostitModal();
    }, 100);
  };

  const handlePostitModal = async () => {
    try {
      await fetch("/api/postits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rollyId: rollyId,
          content: message,
          writerEmail: email,
          postitThemeId: selectedPostitTheme.id,
          fontFamilyId: selectedFontFamily.id,
        }),
      });

      togglePostitModal();
      router.push(`/member/rollies/${rollyId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateBack = () => {
    router.back();
  };

  return (
    <div>
      <Header
        leftContent={<BackButton onClick={toggleBackModal} />}
        title={"메세지 작성"}
      />

      <div className={styles["textField"]}>
        <img
          src={`/images/postit-theme/${selectedPostitTheme.name}.svg`}
          className={styles["postit-theme-bg"]}
        />
        <textarea
          className={`${styles["textArea"]} ${selectedFontFamily.name}`}
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
          {fontFamilyList.map((fontFamily, index) => (
            <ItemBox key={index} variant="text">
              <div
                onClick={() => updateFont(fontFamily)}
                style={{ fontFamily: fontFamily.name }}
              >
                {fontFamily.font}
              </div>
            </ItemBox>
          ))}
        </ScrollContainer>
        <ScrollContainer>
          {postitThemeList.map((postitTheme, index) => (
            <ItemBox key={index} variant="image">
              <img
                src={`/images/postit-theme/${postitTheme.name}.svg`}
                alt={`postit-${postitTheme.name}`}
                onClick={() => updatePostit(postitTheme)}
              />
            </ItemBox>
          ))}
        </ScrollContainer>
        <MainButton
          text={"다음"}
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
        onConfirm={handleEmailModal}
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
        onConfirm={handlePostitModal}
        onCancel={togglePostitModal}
        isOpen={isPostitModalOpen}
      />
      <Modal
        contents={[
          {
            title: "메세지 작성을 중단하시겠어요?",
            body: "지금까지 작성한 내용이 삭제돼요!",
          },
        ]}
        onConfirm={navigateBack}
        onCancel={toggleBackModal}
        isOpen={isBackModalOpen}
        confirmText="확인"
      />
    </div>
  );
};

export default CreatePostits;
