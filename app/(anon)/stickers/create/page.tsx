"use client";

import React, { useState } from "react";
import Image from "next/image";
import BottomSheet from "@/components/bottomSheet/BottomSheet";
import ItemBox from "@/components/itemBox/ItemBox";
import MainButton from "@/components/mainButton/MainButton";
import VerticalScrollContainer from "@/components/verticalScrollContainer/VerticalScrollContainer";
import styles from "./page.module.scss";
import Header from "@/components/header/Header";
import BackButton from "@/components/backButton/BackButton";

interface Sticker {
  id: number;
  src: string;
}

const Stickers: React.FC = () => {
  const [selectedStickers, setSelectedStickers] = useState<Sticker[]>([]); // 상태를 배열로 변경
  const stickerList: string[] = [
    "1.svg",
    "2.svg",
    "3.svg",
    "4.svg",
    "5.svg",
    "6.svg",
    "7.svg",
    "8.svg",
    "9.svg",
    "10.svg",
  ];

  const handleSelectSticker = (src: string) => {
    const newSticker: Sticker = {
      id: selectedStickers.length + 1, // id는 현재 선택된 스티커 수 + 1
      src: src,
    };
    setSelectedStickers([...selectedStickers, newSticker]); // 기존 스티커 배열에 새로운 스티커 추가
  };
  return (
    <div>
      <Header leftContent={<BackButton />} title="스티커" />
      <div className={styles["rolly-field"]}>
        {selectedStickers.map((sticker) => (
          <Image
            key={sticker.id}
            src={`/images/sticker/${sticker.src}`}
            alt={`Sticker ${sticker.id}`}
            width={55}
            height={55}
            style={{
              position: "absolute",
              left: "45%", // Centering the sticker
              cursor: "pointer",
              top: `${sticker.id * 60}px`, // 스티커들이 겹치지 않도록 top을 다르게 설정
            }}
          />
        ))}
      </div>

      <BottomSheet>
        <VerticalScrollContainer>
          {stickerList.map((sticker, index) => (
            <ItemBox key={index} variant="image">
              <Image
                src={`/images/sticker/${sticker}`}
                alt={`Sticker ${index}`}
                onClick={() => handleSelectSticker(sticker)}
                width={55}
                height={55}
                style={{ cursor: "pointer" }}
              />
            </ItemBox>
          ))}
        </VerticalScrollContainer>
        <MainButton
          text="완료"
          onClick={() => console.log(selectedStickers)} // 나중에 서버로 보낼 수 있도록 선택된 스티커 배열 출력
        />
      </BottomSheet>
    </div>
  );
};

export default Stickers;
