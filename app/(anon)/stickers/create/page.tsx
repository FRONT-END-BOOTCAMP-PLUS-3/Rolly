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
  x_position: number; // sticker의 x축 위치
  y_position: number; // sticker의 y축 위치
  rotation: number;
  scale: number; // sticker의 크기
  isSelected?: boolean;
}

const Stickers: React.FC = () => {
  const [selectedStickers, setSelectedStickers] = useState<Sticker[]>([]); // 상태를 배열로 변경
  const [isDragging, setIsDragging] = useState<boolean>(false); // 드래그 상태 관리
  const draggableRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  // 마우스를 떼면 드래그 상태 해제
  const handleMouseUp = useCallback(() => {
    if (isDragging) setIsDragging(false);
  }, [isDragging]);

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
      x_position: 0,
      y_position: 0,
      rotation: 0,
      scale: 1,
      isSelected: false,
    };
    setSelectedStickers([...selectedStickers, newSticker]); // 기존 스티커 배열에 새로운 스티커 추가
  };

  const handleImageClick = (id: number) => {
    if (!isDragging) {
      // 드래그 중이 아닐 때만 선택 상태를 토글
      toggleSelection(id);
    }
  };

  const toggleSelection = (id: number) => {
    setSelectedStickers((stickers) =>
      stickers.map((sticker) =>
        sticker.id === id
          ? { ...sticker, isSelected: !sticker.isSelected }
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
    setIsDragging(true); // 드래그 시작 시 상태 업데이트

    // 해당 스티커의 위치 업데이트
    setSelectedStickers((prevState) =>
      prevState.map((sticker) =>
        sticker.id === id
          ? { ...sticker, x_position: data.x, y_position: data.y } // x, y 위치 업데이트
          : sticker
      )
    );
  };

  // 드래그 끝났을 때 위치 업데이트
  const handleStop = (e: DraggableEvent, data: DraggableData, id: number) => {
    // 해당 스티커의 최종 위치를 업데이트
    e.preventDefault();
    setSelectedStickers((prevState) =>
      prevState.map((sticker) =>
        sticker.id === id
          ? { ...sticker, x_position: data.x, y_position: data.y } // 최종 x, y 위치 업데이트
          : sticker
      )
    );
    setIsDragging(false); // 드래그 종료 시 상태 변경
  };

  // 마우스 이벤트 등록 및 해제
  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseUp]);

  return (
    <div className={styles["stickersContainer"]}>
      <Header leftContent={<BackButton />} title="스티커" />
      <div className={styles["rolly-field"]} ref={fieldRef}>
        {selectedStickers.map((sticker) => (
          <Draggable
            nodeRef={draggableRef as React.RefObject<HTMLElement>}
            key={sticker.id}
            position={{ x: sticker.x_position, y: sticker.y_position }} // 스티커의 위치 설정
            onDrag={(e, data) => handleDrag(e, data, sticker.id)} // 드래그 중 위치 업데이트
            onStop={(e, data) => handleStop(e, data, sticker.id)} // 드래그 끝났을 때 위치 업데이트
            bounds={
              fieldRef.current
                ? {
                    top: 0,
                    left: 0,
                    right: fieldRef.current.clientWidth - 60,
                    bottom: fieldRef.current.clientHeight - 430, //유동적으로 조절
                  }
                : undefined
            }
            disabled={
              isDragging &&
              sticker.id !== selectedStickers[selectedStickers.length - 1]?.id
            } // 드래그 상태에 따라 다른 스티커 이동을 방지
          >
            <div ref={draggableRef} onDragStart={handleDragStart}>
              <Image
                key={sticker.id}
                src={`/images/sticker/${sticker.src}`}
                alt={`Sticker ${sticker.id}`}
                width={55}
                height={55}
                style={{
                  position: "absolute",
                  cursor: "pointer",
                  transform: `rotate(${sticker.rotation}deg) scale(${sticker.scale})`,
                  border: sticker.isSelected ? "2px solid black" : "none", // 선택된 상태에 따라 테두리 색상 변경
                }}
                onClick={() => handleImageClick(sticker.id)}
              />
            </div>
          </Draggable>
        ))}
      </div>

      <BottomSheet>
        <VerticalScrollContainer>
          {stickerList.map((sticker, index) => (
            <ItemBox
              key={index}
              variant="image"
              onClick={() => handleSelectSticker(sticker)}
            >
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
