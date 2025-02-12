"use client";

import { useRouter } from "next/navigation";
import styles from "./BackButton.module.scss";
import Image from "next/image";

interface BackButtonProps {
  onClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  const router = useRouter();

  const handleBack = () => {
    if (onClick) {
      onClick(); // 외부에서 제어하는 함수 실행
    } else {
      router.back(); // onClick이 없을 경우 뒤로가기 기본 동작 실행
    }
  };

  return (
    <button
      className={styles["back-Button"]}
      onClick={handleBack}
      aria-label="뒤로가기 버튼"
    >
      <Image
        src="/icons/back.svg"
        width={24}
        height={24}
        alt="뒤로가기"
        className={styles["icon"]}
      />
    </button>
  );
};

export default BackButton;
