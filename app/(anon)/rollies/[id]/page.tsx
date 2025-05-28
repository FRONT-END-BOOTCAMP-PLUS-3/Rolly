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
import { PostitDto } from "@/application/usecases/postit/dto/PostitDto";
import { StickerDto } from "@/application/usecases/sticker/dto/StickerDto";
import useToggle from "@/hooks/useToggle";
import Modal from "@/components/modal/Modal";
import supabase from "@/utils/supabase/supabaseClient";
import Alert from "@/components/alert/Alert";
import ImageDownloadButton from "@/components/imageDownloadButton/ImageDownloadButton";

const Rollies = () => {
  const router = useRouter();
  const { id: rollyId } = useParams();
  const { title, image, phrase, rollyTheme, setRollyData } = useRollyStore();
  const [postits, setPostits] = useState<PostitDto[]>([]);
  const [stickers, setStickers] = useState<StickerDto[]>([]);
  const [isLocked, setIsLocekd] = useState(false);
  const { userId } = useUserStore();
  const [isConfirmModalOpen, toggleConfirmModal] = useToggle(false);
  const rollyRef = useRef<HTMLDivElement>(null);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertBody, setAlertBody] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  const openAlert = (
    title: string,
    body: string,
    type: "success" | "error"
  ) => {
    setAlertTitle(title);
    setAlertBody(body);
    setAlertType(type);
    setIsAlertOpen(true);
  };

  // 페이지에 접근할 때 현재 경로 저장
  useEffect(() => {
    const currentPath = window.location.pathname;
    sessionStorage.setItem("redirectPath", currentPath);
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      const [rollyRes, postitsRes, stickersRes] = await Promise.all([
        fetch(`/api/rollies/${rollyId}`),
        fetch(`/api/postits?rollyId=${rollyId}`),
        fetch(`/api/stickers?rollyId=${rollyId}`),
      ]);

      const { success: rollySuccess, rollyDetailDto } = await rollyRes.json();
      const { success: postitsSuccess, postitsDto } = await postitsRes.json();
      const { success: stickersSuccess, stickersDto } =
        await stickersRes.json();

      if (rollySuccess) {
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

      if (postitsSuccess) {
        setPostits(postitsDto);
      }

      if (stickersSuccess) {
        setStickers(stickersDto);
      }
    };

    fetchAll();
  }, [rollyId, setRollyData]);

  const navigateToPostIt = () => {
    router.push("/postits/create");
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
      setAlertTitle("저장 중 오류가 발생했습니다.");
      setAlertBody("잠시 후 다시 시도해주세요!");
      setAlertType("error");
      setIsAlertOpen(true);
      if (
        error.message.includes("duplicate key value violates unique constraint")
      ) {
        toggleConfirmModal();
        setAlertBody("이미 저장된 롤리입니다.");
        setAlertBody("");
        setAlertType("error");
        setIsAlertOpen(true);
      }
      return false; // Indicate failure
    }

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
  return (
    <>
      <Header
        leftContent={<HomeButton />}
        rightContent={
          <>
            {isLocked && <ImageDownloadButton targetRef={rollyRef} />}
            <ShareButton openAlert={openAlert} />
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
      <Alert
        title={alertTitle}
        body={alertBody}
        isOpen={isAlertOpen}
        type={alertType}
        onClose={() => setIsAlertOpen(false)}
      />
    </>
  );
};

export default Rollies;
