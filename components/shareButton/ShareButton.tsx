"use client";
import styles from "./ShareButton.module.scss";

interface ShareButtonProps {
  onClick?: () => void;
}

const ShareButton: React.FC<ShareButtonProps> = () => {
  const currentUrl = window.location.href; // 현재 페이지의 URL을 가져옴
  const modifiedUrl = currentUrl.replace("/member", ""); // '/member' 제거

  const handleShare = () => {
    navigator.clipboard
      .writeText(modifiedUrl) // 클립보드에 URL 복사
      .then(() => {
        alert("클립보드에 복사되었습니다.");
      })
      .catch(() => {
        alert("클립보드 복사에 실패했습니다.");
      });
  };

  return (
    <button
      className={styles["share-button"]}
      onClick={handleShare}
      aria-label="공유 버튼"
    >
      <img src="/icons/share.svg" alt="공유하기" className={styles["icon"]} />
    </button>
  );
};

export default ShareButton;
