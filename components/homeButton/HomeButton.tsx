"use client";

import { useRouter } from "next/navigation";
import styles from "./HomeButton.module.scss";

interface HomeButtonProps {
  onClick?: () => void;
}

const HomeButton: React.FC<HomeButtonProps> = ({ onClick }) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    router.push("/pages");
  };

  return (
    <button onClick={handleClick} className={styles["home-button"]}>
      <img src="/icons/home.svg" alt="home button" />
    </button>
  );
};

export default HomeButton;
