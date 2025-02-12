"use client";
import Image from "next/image";
import styles from "./CreateStickerButton.module.scss";

interface CreateStickerButtonProps {
  onClick?: () => void;
  className?: string;
}

const CreateStickerButton: React.FC<CreateStickerButtonProps> = ({
  onClick,
  className,
}) => {
  return (
    <button
      type="button"
      className={`${styles["create-sticker-button"]} ${className}`}
      onClick={onClick}
    >
      <Image
        src="/icons/sticker.svg"
        width={44}
        height={44}
        alt="스티커 만들기"
      />
    </button>
  );
};

export default CreateStickerButton;
