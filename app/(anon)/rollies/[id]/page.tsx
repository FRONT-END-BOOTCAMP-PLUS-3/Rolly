"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import useRollyStore from "@/application/state/useRollyStore";
import useUserStore from "@/application/state/useUserStore";
import Header from "@/components/header/Header";
import ShareButton from "@/components/shareButton/ShareButton";
import HomeButton from "@/components/homeButton/HomeButton";
import CreateStickerButton from "@/components/createStickerButton/CreateStickerButton";
import Rolly from "@/components/rolly/Rolly";
import MainButton from "@/components/mainButton/MainButton";
import { Postit } from "@/components/rolly/Rolly.type";
import useToggle from "@/hooks/useToggle";
import Modal from "@/components/modal/Modal";
import supabase from "@/utils/supabase/supabaseClient";
import Alert from "@/components/alert/Alert";
import ImageDownloadButton from "@/components/imageDownloadButton/ImageDownloadButton";

const Rollies = () => {
  const router = useRouter();
  const { id: rollyId } = useParams();
  const { title, image, phrase, rollyTheme, setRollyData } = useRollyStore();
  const [postits, setPostits] = useState<Postit[]>([]);
  const [isLocked, setIsLocekd] = useState(false);
  const { userId } = useUserStore();
  const [isConfirmModalOpen, toggleConfirmModal] = useToggle(false);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
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

    fetchRollyDetail();
    fetchPostits();
  }, [rollyId, setRollyData]);

  const navigateToPostIt = () => {
    router.push("/member/postits/create");
  };
  const navigateToCreateSticker = () => {
    router.push("/stickers/create");
  };

  const saveRollyToDatabase = async (rollyId: string, userId: string) => {
    const { data, error } = await supabase
      .from("saves")
      .insert([{ rolly_id: rollyId, user_id: userId }]);

    if (error) {
      toggleConfirmModal();
      setAlertMessage("잠시 후 다시 시도해주세요!");
      setAlertOpen(true);
      if (
        error.message.includes("duplicate key value violates unique constraint")
      ) {
        toggleConfirmModal();
        setAlertMessage("이미 저장된 롤리입니다.");
        setAlertOpen(true);
      }
      return false; // Indicate failure
    }

    console.log("Rolly saved successfully:", data);
    return true; // Indicate success
  };

  const handleSaveRolly = async () => {
    const success = await saveRollyToDatabase(rollyId, userId);
    if (success) {
      router.push("/member/rollies/saved");
    } else {
      console.log("롤리 저장에 실패했습니다.");
    }
  };

  const handleSaveButtonClick = async () => {
    console.log("userId:", userId);
    // Check if the user is logged in
    if (!userId || userId === "00000000-0000-0000-0000-000000000000") {
      // User is not logged in, redirect to the login page
      router.push("/page");
    } else {
      // User is logged in, toggle the modal to confirm the save action
      toggleConfirmModal();
    }
  };
  return (
    <>
      <Header
        leftContent={<HomeButton />}
        rightContent={
          <>
            {isLocked && <ImageDownloadButton targetRef={rollyRef} />}
            <ShareButton />
          </>
        }
        title={title}
      />
      <div ref={rollyRef}>
        <Rolly
          theme={rollyTheme}
          phrase={phrase}
          isEditable={false}
          imageUrl={image}
          postits={postits}
        />
      </div>
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
      <Alert
        title="저장 중 오류가 발생했습니다. "
        body={alertMessage}
        isOpen={isAlertOpen}
        onClose={() => setAlertOpen(false)}
      />
    </>
  );
};

export default Rollies;
