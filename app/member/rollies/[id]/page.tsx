"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import useRollyStore from "@/application/state/useRollyStore";
import Header from "@/components/header/Header";
import ShareButton from "@/components/shareButton/ShareButton";
import BackButton from "@/components/backButton/BackButton";
import CreateStickerButton from "@/components/createStickerButton/CreateStickerButton";
import Rolly from "@/components/rolly/Rolly";
import MainButton from "@/components/mainButton/MainButton";
import { Postit } from "@/components/rolly/Rolly.type";
import ImageDownloadButton from "@/components/imageDownloadButton/ImageDownloadButton";

const Rollies = () => {
  const router = useRouter();
  const { id: rollyId } = useParams();
  const { title, image, phrase, rollyTheme, setRollyData } = useRollyStore();
  const [postits, setPostits] = useState<Postit[]>([]);
  const [isLocked, setIsLocekd] = useState(false);
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
      {!isLocked && (
        <MainButton text="메시지 작성하기" onClick={navigateToPostIt} />
      )}
    </>
  );
};

export default Rollies;
