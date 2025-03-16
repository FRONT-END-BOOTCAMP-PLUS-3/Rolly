"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import useToggle from "@/hooks/useToggle";
import supabase from "@/utils/supabase/supabaseClient";
import useRollyStore from "@/application/state/useRollyStore";
import useUserStore from "@/application/state/useUserStore";
import Header from "@/components/header/Header";
import ShareButton from "@/components/shareButton/ShareButton";
import BackButton from "@/components/backButton/BackButton";
import CreateStickerButton from "@/components/createStickerButton/CreateStickerButton";
import Rolly from "@/components/rolly/Rolly";
import MainButton from "@/components/mainButton/MainButton";
import ImageDownloadButton from "@/components/imageDownloadButton/ImageDownloadButton";
import Modal from "@/components/modal/Modal";

import { PostitDto } from "@/application/usecases/postit/dto/PostitDto";
import { StickerDto } from "@/application/usecases/sticker/dto/StickerDto";

const Rollies = () => {
  const router = useRouter();
  const { id: rollyId } = useParams();
  const { userId } = useUserStore();
  const { title, image, phrase, rollyTheme, setRollyData } = useRollyStore();
  const [postits, setPostits] = useState<PostitDto[]>([]);
  const [stickers, setStickers] = useState<StickerDto[]>([]);
  const [isLocked, setIsLocekd] = useState(false);
  const [isConfirmModalOpen, toggleConfirmModal] = useToggle(false);
  const rollyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchRollyDetail = async () => {
      const response = await fetch(`/api/rollies/${rollyId}`);
      const { success, rollyDetailDto } = await response.json();
      if (success) {
        setRollyData({
          id: rollyDetailDto.id,
          typeId: rollyDetailDto.typeId,
          title: rollyDetailDto.title,
          image: rollyDetailDto.image,
          phrase: rollyDetailDto.phrase,
          rollyTheme: rollyDetailDto.backgroundTheme,
        });
        setIsLocekd(rollyDetailDto.isLocked);
      }
    };

    const fetchPostits = async () => {
      const response = await fetch(`/api/postits?rollyId=${rollyId}`);
      const { success, postitsDto } = await response.json();
      if (success) {
        setPostits(postitsDto);
      }
    };

    const fetcStickers = async () => {
      const response = await fetch(`/api/stickers?rollyId=${rollyId}`);
      const { success, stickersDto } = await response.json();
      if (success) {
        setStickers(stickersDto);
      }
    };

    fetchRollyDetail();
    fetchPostits();
    fetcStickers();
  }, [rollyId, setRollyData]);

  const handleSaveButtonClick = async () => {
    console.log("userId:", userId);
    // Check if the user is logged in
    if (!userId || userId === "00000000-0000-0000-0000-000000000000") {
      // User is not logged in, redirect to the login page
      router.push("/");
    } else {
      // User is logged in, toggle the modal to confirm the save action
      toggleConfirmModal();
    }
  };

  const saveRollyToDatabase = async (rollyId: string, userId: string) => {
    const { data } = await supabase
      .from("saves")
      .insert([{ rolly_id: rollyId, user_id: userId }]);
    toggleConfirmModal();

    console.log("Rolly saved successfully:", data);
    return true; // Indicate success
  };

  const handleSaveRolly = async () => {
    if (typeof rollyId === "string") {
      const success = await saveRollyToDatabase(rollyId, userId);
      if (success) {
        router.push("/member/rollies/saved");
      } else {
        console.log("롤리 저장에 실패했습니다.");
      }
    } else {
      console.error("Invalid rollyId:", rollyId);
    }
  };

  const navigateToPostIt = () => {
    router.push("/member/postits/create");
  };
  const navigateToCreateSticker = () => {
    router.push("/member/stickers/create");
  };

  return (
    <>
      <Header
        leftContent={<BackButton />}
        rightContent={
          <>
            {isLocked && <ImageDownloadButton targetRef={rollyRef} />}
            <ShareButton />
          </>
        }
        title={title}
      />
      <Rolly
        ref={rollyRef}
        theme={rollyTheme}
        phrase={phrase}
        isEditable={false}
        imageUrl={image}
        postits={postits}
        stickers={stickers}
      />
      {!isLocked && <CreateStickerButton onClick={navigateToCreateSticker} />}
      <MainButton
        text={isLocked ? "롤리 저장하기" : "메시지 작성하기"}
        onClick={isLocked ? handleSaveButtonClick : navigateToPostIt}
      />

      <Modal
        contents={[
          {
            title: "롤리를 저장하시겠어요?",
          },
        ]}
        onConfirm={handleSaveRolly}
        onCancel={toggleConfirmModal}
        isOpen={isConfirmModalOpen}
      />
    </>
  );
};

export default Rollies;
