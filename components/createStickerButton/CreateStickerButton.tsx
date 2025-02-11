"use client";
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
      <img src="/icons/sticker.svg" alt="스티커 만들기" />
    </button>
  );
};

export default CreateStickerButton;
