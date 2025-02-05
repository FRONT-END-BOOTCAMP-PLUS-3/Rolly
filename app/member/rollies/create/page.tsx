"use client";

import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useToggle from "@/hooks/useToggle";
import useRollyCreateStore from "@/application/state/useRollyCreateStore";
import { FormData } from "@/components/modal/Modal.type";
import BottomSheet from "@/components/bottomSheet/BottomSheet";
import ScrollContainer from "@/components/scrollContainer/ScrollContainer";
import MainButton from "@/components/mainButton/MainButton";
import Header from "@/components/header/Header";
import BackButton from "@/components/backButton/BackButton";
import Modal from "@/components/modal/Modal";
import Rolly from "@/components/rolly/Rolly";

import { DfUploadImageUsecase } from "@/application/usecases/rolly/DfUploadImageUsecase";

const TEMP_USER_ID = "15911709-59d8-47f5-9448-0c825ee184fb";
const INITIAL_PHRASE = "문구를 입력해주세요";
const ROLLY_THEMES = [
  "hbd",
  "good-luck",
  "chain-letter",
  "congratulation",
  "graduation1",
  "graduation2",
];

const CreateRollies = () => {
  const router = useRouter();
  const { type, title } = useRollyCreateStore();
  const [theme, setTheme] = useState("hbd");
  const [phrase, setPhrase] = useState(INITIAL_PHRASE);
  const [file, setFile] = useState<File>();
  const [previewImgUrl, setPreviewImgUrl] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [isPhraseModalOpen, togglePhraseModal] = useToggle(false);
  const [isCreateModalOpen, toggleCreateModal] = useToggle(false);
  const [isBackModalOpen, toggleBackModal] = useToggle(false);

  const updateTheme = (theme: string) => {
    setTheme(theme);
  };

  const updatePhrase = (formData?: FormData) => {
    if (formData && formData.modal_text) {
      setPhrase(formData["modal_text"]);
      togglePhraseModal();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFile(file);

      const previewImgUrl = URL.createObjectURL(file);
      setPreviewImgUrl(previewImgUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (previewImgUrl) URL.revokeObjectURL(previewImgUrl);
    };
  }, [previewImgUrl]); // 미리보기 URL 정리 (메모리 누수 방지)

  const uploadImage = async (file: File) => {
    try {
      const uploadImageUsecase = new DfUploadImageUsecase();
      const uploadedImageUrl = await uploadImageUsecase.execute(file);

      if (uploadedImageUrl) {
        setImageUrl(uploadedImageUrl);
        toggleCreateModal();
      }
    } catch (error) {
      console.error("이미지 업로드 오류:", (error as Error).message);
    }
  };

  const handleSubmit = async () => {
    if (!imageUrl || !phrase || phrase === INITIAL_PHRASE) return;

    try {
      const response = await fetch("/api/rollies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: TEMP_USER_ID,
          typeId: type,
          title: title,
          image: imageUrl,
          phrase: phrase,
          backgroundThemeId: 1,
        }),
      });
      const result = await response.json();

      toggleCreateModal();
      router.push(`/member/rollies/${result.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateBack = () => {
    router.push("/member");
  };

  return (
    <>
      <Header
        title="롤리 만들기"
        leftContent={<BackButton onClick={toggleBackModal} />}
      />
      <Rolly
        theme={theme}
        phrase={phrase}
        previewImgUrl={previewImgUrl}
        isEditable={true}
        onPhraseClick={togglePhraseModal}
        onFileChange={handleFileChange}
      />
      <BottomSheet>
        <ScrollContainer>
          {ROLLY_THEMES.map((theme) => (
            <button
              type="button"
              key={theme}
              className={styles["theme-btn"]}
              onClick={() => updateTheme(theme)}
            >
              <Image
                src={`/images/rolly-theme/${theme}.svg`}
                width={100}
                height={100}
                className={styles["theme-img"]}
                alt={`롤리 ${theme} 테마`}
              />
            </button>
          ))}
        </ScrollContainer>
        <MainButton
          text="완료"
          onClick={() => file && uploadImage(file)}
          disabled={phrase === INITIAL_PHRASE || !phrase || !previewImgUrl}
        />
      </BottomSheet>

      <Modal
        contents={[
          {
            title: "롤리 중앙에 들어갈 문구를 작성해주세요",
            body: "최대 14자까지 가능해요!",
            input: "text",
            maxLength: 14,
          },
        ]}
        onConfirm={updatePhrase}
        onCancel={togglePhraseModal}
        isOpen={isPhraseModalOpen}
      />

      <Modal
        contents={[
          {
            title: "롤리 만들기를 중단하시겠어요?",
            body: "지금까지 작성한 내용이 삭제돼요!",
          },
        ]}
        onConfirm={navigateBack}
        onCancel={toggleBackModal}
        isOpen={isBackModalOpen}
        confirmText="확인"
      />

      <Modal
        contents={[
          {
            title: "롤리를 만드시겠어요?",
            body: "완성 후에는 테마 및 이미지, 문구를 수정할 수 없어요!",
          },
        ]}
        onConfirm={handleSubmit}
        onCancel={toggleCreateModal}
        isOpen={isCreateModalOpen}
      />
    </>
  );
};

export default CreateRollies;
