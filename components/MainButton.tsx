"use client";
import styles from "./MainButton.module.scss";

interface MainButtonProps {
  text: string;
  onClick?: () => void;
}

const MainButton: React.FC<MainButtonProps> = ({ text, onClick }) => {
  return (
    <button className={styles["main-button"]} onClick={onClick}>
      {text}
    </button>
  );
};

export default MainButton;
