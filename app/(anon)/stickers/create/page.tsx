"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import BottomSheet from "@/components/bottomSheet/BottomSheet";
import ItemBox from "@/components/itemBox/ItemBox";
import MainButton from "@/components/mainButton/MainButton";
import VerticalScrollContainer from "@/components/verticalScrollContainer/VerticalScrollContainer";
import styles from "./page.module.scss";
import Header from "@/components/header/Header";
import BackButton from "@/components/backButton/BackButton";
import { StickerStyleDto } from "@/application/usecases/stickerStyle/dto/StickerStyleDto";
import supabase from "@/utils/supabase/supabaseClient";

interface Sticker {
  id: string;
  sticker_style_id: number;
  x_position: number;
  y_position: number;
}

interface StickerStyle {
  id: number;
  name: string;
  src: string;
}

const Stickers: React.FC = () => {
  const [selectedStickers, setSelectedStickers] = useState<Sticker[]>([]);
  const [stickerStyleList, setStickerStyleList] = useState<StickerStyleDto[]>(
    []
  );

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const draggableRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const handleMouseUp = useCallback(() => {
    if (isDragging) setIsDragging(false);
  }, [isDragging]);

  const handleMouseDown = useCallback(() => {}, []);

  useEffect(() => {
    const fetchStickerStyles = async () => {
      try {
        const response = await fetch("/api/stickerstyles/");
        if (!response.ok) {
          throw new Error("Failed to fetch stickers");
        }
        const data = await response.json();

        if (!data.success || !data.data) {
          throw new Error("Invalid response format");
        }
        setStickerStyleList(data.data);

        console.log(stickerStyleList);
      } catch (error) {
        console.error("Error fetching stickers:", error);
      }
    };
    fetchStickerStyles();
  }, []);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousedown", handleMouseDown);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [handleMouseUp, handleMouseDown]);

  const uploadStickers = async () => {
    console.log(selectedStickers);

    // 각 스티커를 데이터베이스에 저장
    for (const sticker of selectedStickers) {
      const { data, error } = await supabase.from("sticker").insert([
        {
          sticker_style_id: sticker.sticker_style_id,
          x_position: sticker.x_position,
          y_position: sticker.y_position,
        },
      ]);

      // 에러 처리
      if (error) {
        console.error("Error inserting sticker:", error);
        break; // 에러가 발생하면 반복 중단
      } else {
        console.log("Inserted sticker:", data);
      }
    }
  };

  const addSticker = (stickerStyle: StickerStyle) => {
    const newSticker: Sticker = {
      id: `sticker-${Date.now()}`,
      sticker_style_id: stickerStyle.id,
      x_position: 0, // 초기 위치는 기본값으로 설정
      y_position: 0,
    };
    setSelectedStickers((prev) => [...prev, newSticker]);
    console.log(selectedStickers);
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  // 드래그 중 위치 업데이트
  const handleDrag = (e: DraggableEvent, data: DraggableData, id: string) => {
    setSelectedStickers((prev) =>
      prev.map((sticker) =>
        sticker.id === id
          ? { ...sticker, x_position: data.x, y_position: data.y }
          : sticker
      )
    );
  };
  const handleDeleteSticker = (id: string) => {
    setSelectedStickers((prev) => prev.filter((sticker) => sticker.id !== id));
  };

  return (
    <div className={styles["stickersContainer"]}>
      <Header leftContent={<BackButton />} title="스티커" />
      <div className={styles["rolly-field"]} ref={fieldRef}>
        {selectedStickers.map((sticker) => (
          <Draggable
            nodeRef={draggableRef as React.RefObject<HTMLElement>}
            key={sticker.id}
            position={{ x: sticker.x_position, y: sticker.y_position }}
            onStart={() => setIsDragging(true)}
            onDrag={(e, data) => handleDrag(e, data, sticker.id)}
            onStop={() => setIsDragging(false)}
            bounds={
              fieldRef.current
                ? {
                    top: 0,
                    left: 0,
                    right: fieldRef.current.clientWidth - 60,
                    bottom: fieldRef.current.clientHeight - 430,
                  }
                : undefined
            }
          >
            <div
              ref={draggableRef}
              onDragStart={handleDragStart}
              style={{
                position: "absolute",
              }}
            >
              <Image
                src={`/images/sticker/${sticker.sticker_style_id}.svg`}
                // src={`/images/sticker/${sticker.src}`}
                alt={`Sticker ${sticker.id}`}
                width={55}
                height={55}
                style={{
                  cursor: "pointer",
                }}
              />
              <button
                className={styles["delete-button"]}
                onClick={() => handleDeleteSticker(sticker.id)}
              >
                X
              </button>
            </div>
          </Draggable>
        ))}
      </div>

      <BottomSheet>
        <VerticalScrollContainer>
          {stickerStyleList.map((stickerStyle, index) => (
            <ItemBox key={index} variant="image">
              <div onClick={() => addSticker(stickerStyle)}>
                <Image
                  src={`/images/sticker/${stickerStyle.name}.svg`}
                  alt={`Sticker ${stickerStyle.name}`}
                  width={50}
                  height={50}
                />
              </div>
            </ItemBox>
          ))}
        </VerticalScrollContainer>
        <MainButton text="완료" onClick={uploadStickers} />
      </BottomSheet>
    </div>
  );
};

export default Stickers;
