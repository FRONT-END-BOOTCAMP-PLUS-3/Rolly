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
import supabase from "@/utils/supabase/supabaseClient";
import { StickerStyleDto } from "@/application/usecases/stickerStyle/dto/StickerStyleDto";

interface Sticker {
  id: number;
  src: string;
  x_position: number;
  y_position: number;
  rotation: number;
  scale: number;
}

const Stickers: React.FC = () => {
  const [selectedStickers, setSelectedStickers] = useState<Sticker[]>([]);
  const [stickerStyleList, setStickerStyleList] = useState<StickerStyleDto[]>(
    []
  );

  const [selectedStickerStyle, setSelectedStickerStyle] = useState<{
    id: number;
    name: string;
  }>({ id: 0, name: "" });

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
        // const stickers = data.data.map(
        //   (item: { id: number; name: string }) => ({
        //     id: item.id,
        //     name: item.name,
        //   })
        // );

        // setStickerStyleList(stickers);
        // if (stickers.length > 0) {
        //   setSelectedStickerStyle(stickers[0]);
        // }
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
    // 각 스티커 정보를 데이터베이스에 저장
    for (const sticker of selectedStickers) {
      const { data, error } = await supabase.from("sticker").insert([
        {
          id: sticker.id,
          x_position: sticker.x_position,
          y_position: sticker.y_position,
          rotation: sticker.rotation,
          scale: sticker.scale,
        },
      ]);

      if (error) {
        console.error("Error uploading sticker:", error);
        return;
      }
      console.log("Uploaded sticker:", data);
    }
  };

  const updateStickerStyle = (sticker: { id: number; name: string }) => {
    setSelectedStickerStyle(sticker);
  };

  const updateStickerPosition = (id: number, x: number, y: number) => {
    setSelectedStickers((prev) =>
      prev.map((sticker) =>
        sticker.id === id
          ? { ...sticker, x_position: x, y_position: y }
          : sticker
      )
    );
  };
  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  // 드래그 중 위치 업데이트
  const handleDrag = (e: DraggableEvent, data: DraggableData, id: number) => {
    updateStickerPosition(id, data.x, data.y);
  };

  const handleDeleteSticker = (id: number) => {
    setSelectedStickers((prev) => prev.filter((sticker) => sticker.id !== id));
    console.log("deleted sticker:", id);
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
            <div ref={draggableRef} onDragStart={handleDragStart}>
              <Image
                src={`/images/sticker/${sticker.src}`}
                alt={`Sticker ${sticker.id}`}
                width={55}
                height={55}
                style={{
                  position: "relative",
                  cursor: "pointer",
                  transform: `rotate(${sticker.rotation}deg)`,
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
              <Image
                src={`/images/sticker/${stickerStyle.name}.svg`}
                alt={`Sticker ${stickerStyle.name}`}
                onClick={() => updateStickerStyle(stickerStyle)}
                width={55}
                height={55}
                style={{ cursor: "pointer" }}
              />
            </ItemBox>
          ))}
        </VerticalScrollContainer>
        <MainButton text="완료" onClick={uploadStickers} />
      </BottomSheet>
    </div>
  );
};

export default Stickers;
