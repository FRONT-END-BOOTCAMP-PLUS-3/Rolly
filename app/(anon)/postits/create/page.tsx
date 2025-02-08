"use client";
import BottomSheet from "@/components/bottomSheet/BottomSheet";
import ItemBox from "@/components/itemBox/ItemBox";
import MainButton from "@/components/mainButton/MainButton";
import ScrollContainer from "@/components/scrollContainer/ScrollContainer";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import Header from "@/components/header/Header";
import BackButton from "@/components/backButton/BackButton";

const Index = () => {
  const [selectedPostit, setSelectedPostit] = useState<string>("");
  const [selectedFont, setSelectedFont] = useState<string>("");
  const [postits, setPostits] = useState<string[]>([]);
  const [fonts, setFonts] = useState<{ font: string; name: string }[]>([]);

  useEffect(() => {
    const fetchPostits = async () => {
      try {
        const response = await fetch("/api/postitthemes/");
        if (!response.ok) {
          throw new Error("Failed to fetch postits");
        }
        const data = await response.json();

        if (!data.success || !data.data) {
          throw new Error("Invalid response format");
        }

        const postitNames = data.data.map(
          (item: { name: string }) => item.name
        ); // ✅ API 응답 구조 반영
        setPostits(postitNames);
        setSelectedPostit(postitNames[0] || ""); // 기본 선택값 설정
      } catch (error) {
        console.error("Error fetching postits:", error);
      }
    };
    const fetchFonts = async () => {
      try {
        const response = await fetch("/api/fontfamilies/");
        if (!response.ok) {
          throw new Error("Failed to fetch fonts");
        }
        const data = await response.json();

        if (!data.success || !data.data) {
          throw new Error("Invalid response format");
        }

        setFonts(data.data);
      } catch (error) {
        console.error("Error fetching fonts:", error);
      }
    };
    fetchFonts();
    fetchPostits();
  }, []);

  // 이미지 클릭 시 해당 이미지를 상태에 저장
  const handleImageClick = (value: string) => {
    setSelectedPostit(value);
  };

  return (
    <div>
      <Header leftContent={<BackButton />} title={"메세지 작성"} />

      <div className={styles["textField"]}>
        <img
          src={`/images/postit-theme/${selectedPostit}.svg`}
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
                onClick={() => setSelectedFont(font.name)}
                style={{ fontFamily: font.name }}
              >
                {font.font}
              </div>
            </ItemBox>
          ))}
        </ScrollContainer>
        <ScrollContainer>
          {postits.map((postit, index) => (
            <ItemBox key={index} variant="image">
              <img
                src={`/images/postit-theme/${postit}.svg`}
                alt={`postit-${index}`}
                onClick={() => handleImageClick(postit)}
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
