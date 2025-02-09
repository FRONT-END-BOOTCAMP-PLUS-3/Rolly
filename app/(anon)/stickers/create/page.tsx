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
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const draggableRef = useRef<HTMLDivElement>(null);

  const fieldRef = useRef<HTMLDivElement>(null);

  const handleMouseUp = useCallback(() => {
    if (isDragging) setIsDragging(false);
  }, [isDragging]);

  const handleMouseDown = useCallback(() => {}, []);

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
    setSelectedStickers((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        src,
        x_position: 0,
        y_position: 0,
        rotation: 0,
        scale: 1,
      },
    ]);
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

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousedown", handleMouseDown);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [handleMouseUp, handleMouseDown]);

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
                  position: "absolute",
                  cursor: "pointer",
                  transform: `rotate(${sticker.rotation}deg)`,
                }}
              />
            </div>
          </Draggable>
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
        <MainButton text="완료" onClick={() => console.log(selectedStickers)} />
      </BottomSheet>
    </div>
  );
};

export default Stickers;
