"use client";
import styles from "./MainButton.module.scss";

interface MainButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const MainButton: React.FC<MainButtonProps> = ({ text, onClick, disabled }) => {
  return (
    <button
      type="button"
      className={styles["main-button"]}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default MainButton;
