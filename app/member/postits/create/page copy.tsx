"use client";
import BottomSheet from "@/components/bottomSheet/BottomSheet";
import ItemBox from "@/components/itemBox/ItemBox";
import MainButton from "@/components/mainButton/MainButton";
import ScrollContainer from "@/components/scrollContainer/ScrollContainer";
import styles from "./page.module.scss";
import { useState } from "react";
import Header from "@/components/header/Header";
import BackButton from "@/components/backButton/BackButton";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string>("clover.svg");
  const [selectedFont, setSelectedFont] = useState<string>("");

  const images = [
    "clover.svg",
    "flower.svg",
    "heart1.svg",
    "heart2.svg",
    "heart3.svg",
    "square1.svg",
    "square2.svg",
    "square3.svg",
    "circle1.svg",
    "circle2.svg",
  ];

  const fonts = [
    { name: "박다현체", value: "bakdahyeon" },
    { name: "메모앤옥자체", value: "memoaenokja" },
    { name: "이서윤체", value: "LeeSeoyun" },
    { name: "류류체", value: "ryuryuche" },
    { name: "류뚱체", value: "ryuttungche" },
    { name: "세종글꽃체", value: "SejongGeulggot" },
  ];

  // 이미지 클릭 시 해당 이미지를 상태에 저장
  const handleImageClick = (value: string) => {
    setSelectedImage(value);
  };

  return (
    <div>
      <Header leftContent={<BackButton />} title={"메세지 작성"} />

      <div className={styles["textField"]}>
        <img
          src={`/images/postit-theme/${selectedImage}`}
          className={styles["postit-theme-bg"]}
        />
        <textarea
          className={styles["textArea"]}
          placeholder="메시지를 작성하세요"
          maxLength={100}
          rows={6}
          cols={50}
          style={{
            fontFamily: selectedFont,
          }}
        />
      </div>
      <BottomSheet>
        <ScrollContainer>
          {fonts.map((font, index) => (
            <ItemBox key={index} variant="text">
              <div
                onClick={() => setSelectedFont(font.value)}
                style={{ fontFamily: font.value }}
              >
                {font.name}
              </div>
            </ItemBox>
          ))}
        </ScrollContainer>
        <ScrollContainer>
          {images.map((image, index) => (
            <ItemBox key={index} variant="image">
              <img
                src={`/images/postit-theme/${image}`}
                alt={`image-${index}`}
                onClick={() => handleImageClick(image)}
              />
            </ItemBox>
          ))}
        </ScrollContainer>
        <MainButton
          text={"다음"}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </BottomSheet>
    </div>
  );
};

export default Index;
