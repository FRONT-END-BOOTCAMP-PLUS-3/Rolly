"use client";

import { useRouter } from "next/navigation";
import styles from "./HomeButton.module.scss";
import Image from "next/image";

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
      <Image src="/icons/home.svg" width={24} height={24} alt="home button" />
    </button>
  );
};

export default HomeButton;
