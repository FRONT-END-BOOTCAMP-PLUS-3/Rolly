"use client";
import Image from "next/image";
import styles from "./ShareButton.module.scss";

type ShareButtonProps = {
  openAlert: (title: string, body: string, type: "success" | "error") => void;
};

const ShareButton = ({ openAlert }: ShareButtonProps) => {
  const currentUrl = typeof window !== "undefined" ? window.location.href : ""; // 현재 페이지의 URL을 가져옴
  const modifiedUrl = currentUrl.replace("/member", ""); // '/member' 제거

  const handleShare = () => {
    navigator.clipboard
      .writeText(modifiedUrl) // 클립보드에 URL 복사
      .then(() => {
        openAlert(
          "공유 링크 복사 완료!",
          "링크가 클립보드에 복사되었습니다.",
          "success"
        );
      })
      .catch(() => {
        openAlert(
          "공유 링크 복사 실패!",
          "클립보드 복사에 실패했습니다.",
          "error"
        );
      });
  };

  return (
    <button onClick={handleShare} aria-label="공유 버튼">
      <Image
        src="/icons/share.svg"
        width={24}
        height={24}
        alt="공유하기"
        className={styles["icon"]}
      />
    </button>
  );
};

export default ShareButton;
