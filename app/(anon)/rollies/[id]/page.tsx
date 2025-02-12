"use client";

import { useEffect, useState } from "react";
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
import supabase from "@/utils/supabase/supabaseClient";

const Rollies = () => {
  const router = useRouter();
  const { id: rollyId } = useParams();
  const { title, image, phrase, rollyTheme, setRollyData } = useRollyStore();
  const [postits, setPostits] = useState<Postit[]>([]);
  const [isLocked, setIsLocekd] = useState(false);
  const { userId } = useUserStore();

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
      console.error("Error saving rolly:", error.message);
      return false; // Indicate failure
    }

    console.log("Rolly saved successfully:", data);
    return true; // Indicate success
  };

  const saveRolly = async () => {
    console.log(userId);
    if (!userId || userId === "00000000-0000-0000-0000-000000000000") {
      router.push("/page");
      return;
    }
    console.log("롤리 저장 중...");
    const success = await saveRollyToDatabase(rollyId, userId);
    if (success) {
      console.log("롤리가 성공적으로 저장되었습니다.");
    } else {
      console.log("롤리 저장에 실패했습니다.");
      console.log("내가 받은 롤리로 저장 및 이동");
    }
  };

  return (
    <>
      <Header
        leftContent={<HomeButton />}
        rightContent={<ShareButton />}
        title={title}
      />
      <Rolly
        theme={rollyTheme}
        phrase={phrase}
        isEditable={false}
        imageUrl={image}
        postits={postits}
      />
      {!isLocked && <CreateStickerButton onClick={navigateToCreateSticker} />}
      <MainButton
        text={isLocked ? "롤리 저장하기" : "메시지 작성하기"}
        onClick={isLocked ? saveRolly : navigateToPostIt}
      />
    </>
  );
};

export default Rollies;
