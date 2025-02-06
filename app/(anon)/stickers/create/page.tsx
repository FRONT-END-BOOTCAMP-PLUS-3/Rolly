"use client";
import BottomSheet from "@/components/bottomSheet/BottomSheet";
import ItemBox from "@/components/itemBox/ItemBox";
import MainButton from "@/components/mainButton/MainButton";
import VerticalScrollContainer from "@/components/verticalScrollContainer/VerticalScrollContainer";
import styles from "./page.module.scss";
// import { useState } from "react";
import Header from "@/components/header/Header";
import BackButton from "@/components/backButton/BackButton";

const stickers = () => {
  const stickers = [
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

  return (
    <div>
      <Header leftContent={<BackButton />} title={"스티커"} />

      <div className={styles["rolly-field"]}>Rolly</div>

      <BottomSheet>
        <VerticalScrollContainer>
          {stickers.map((sticker, index) => (
            <ItemBox key={index} variant="image">
              <img src={`/images/sticker/${sticker}`} alt={`image-${index}`} />
            </ItemBox>
          ))}
        </VerticalScrollContainer>
        <MainButton
          text={"완료"}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </BottomSheet>
    </div>
  );
};

export default stickers;
