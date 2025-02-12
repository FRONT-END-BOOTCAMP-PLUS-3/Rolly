"use client";

import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useToggle from "@/hooks/useToggle";
import useRollyCreateStore from "@/application/state/useRollyCreateStore";
import useUserStore from "@/application/state/useUserStore";
import { InputFormData } from "@/components/modal/Modal.type";
import BottomSheet from "@/components/bottomSheet/BottomSheet";
import ScrollContainer from "@/components/scrollContainer/ScrollContainer";
import MainButton from "@/components/mainButton/MainButton";
import Header from "@/components/header/Header";
import BackButton from "@/components/backButton/BackButton";
import Modal from "@/components/modal/Modal";
import Rolly from "@/components/rolly/Rolly";

import { RollyThemeDto } from "@/application/usecases/rollyTheme/dto/RollyThemeDto";

const INITIAL_PHRASE = "문구를 입력해주세요";

const CreateRollies = () => {
  const router = useRouter();
  const { type, title } = useRollyCreateStore();
  const { userId } = useUserStore();
  const [rollyThemeList, setRollyThemeList] = useState<RollyThemeDto[]>([]);
  const [selectedRollyTheme, setSelectedRollyTheme] = useState<RollyThemeDto>({
    id: 1,
    name: "hbd",
  });
  const [phrase, setPhrase] = useState(INITIAL_PHRASE);
  const [file, setFile] = useState<File>();
  const [previewImgUrl, setPreviewImgUrl] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [isPhraseModalOpen, togglePhraseModal] = useToggle(false);
  const [isCreateModalOpen, toggleCreateModal] = useToggle(false);
  const [isBackModalOpen, toggleBackModal] = useToggle(false);

  useEffect(() => {
    const fetchRollyThemeList = async () => {
      const response = await fetch("/api/rollythemes");
      const { success, data } = await response.json();
      if (success) {
        setRollyThemeList(data);
      }
    };
    fetchRollyThemeList();
  }, []);

  const updateRollyTheme = (rollytheme: RollyThemeDto) => {
    setSelectedRollyTheme(rollytheme);
  };

  const updatePhrase = (inputFormData?: InputFormData) => {
    if (inputFormData && inputFormData.modal_text) {
      setPhrase(inputFormData["modal_text"]);
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
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/images", {
        method: "POST",
        body: formData,
      });

      const { success, imageUrl } = await response.json();
      if (success) setImageUrl(imageUrl);

      toggleCreateModal();
    } catch (error) {
      console.error(error);
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
          userId: userId,
          typeId: type,
          title: title,
          image: imageUrl,
          phrase: phrase,
          backgroundThemeId: selectedRollyTheme.id,
        }),
      });
      const { rollyId } = await response.json();
      toggleCreateModal();
      router.replace(`/member/rollies/${rollyId}`);
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
        theme={selectedRollyTheme.name}
        phrase={phrase}
        previewImgUrl={previewImgUrl}
        isEditable={true}
        onPhraseClick={togglePhraseModal}
        onFileChange={handleFileChange}
      />
      <BottomSheet>
        <ScrollContainer>
          {rollyThemeList.map((rollyTheme) => (
            <button
              type="button"
              key={rollyTheme.id}
              className={styles["theme-btn"]}
              onClick={() => updateRollyTheme(rollyTheme)}
            >
              <Image
                src={`/images/rolly-theme/${rollyTheme.name}.svg`}
                width={100}
                height={100}
                className={styles["theme-img"]}
                alt={`롤리 ${rollyTheme.name} 테마`}
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
