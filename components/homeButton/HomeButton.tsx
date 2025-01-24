"use client";

import styles from "./HomeButton.module.scss";

interface HomeButtonProps {
  onClick: () => void;
}

const HomeButton: React.FC<HomeButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles["home-button"]}>
      <img
        src="/icons/home.svg" //
        alt="home button"
      />
    </button>
  );
};

export default HomeButton;

//비로그인 시 : 시작화면으로 이동 로직추가 필요
//로그인 시 : 메인 화면으로 이동  로직추가 필요
