"use client";
import { useRouter } from "next/navigation";
import styles from "./BackButton.module.scss";

interface BackButtonProps {
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ className }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      className={`${styles["back-Button"]} ${className || ""}`}
      onClick={handleBack}
      aria-label="뒤로가기 버튼"
    >
      <img
        src="/icons/back.svg" //
        alt="뒤로가기"
        className={styles["icon"]}
      />
    </button>
  );
};

export default BackButton;
