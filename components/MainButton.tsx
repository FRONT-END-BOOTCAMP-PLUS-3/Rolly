"use client";
import React from "react";
import styles from "./MainButton.module.css";

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
