"use client";
import BackButton from "@/components/backButton/BackButton";
import Header from "@/components/header/Header";
import styles from "./page.module.scss";
import MainButton from "@/components/mainButton/MainButton";
import useToggle from "@/hooks/useToggle";
import Modal from "@/components/modal/Modal";

const Index: React.FC = () => {
  const [isReplyModalOpen, toggleReplyModal] = useToggle(false); // Reply 모달
  const handleConfirmReply = () => {
    toggleReplyModal();
  };
  return (
    <div>
      <Header leftContent={<BackButton />} title="답장" />
      <textarea
        className={styles["textarea"]}
        maxLength={100}
        rows={5}
        cols={50}
        placeholder="이곳에 입력해주세요(최대 100자)"
      />
      <div className={styles["reply-button"]}>
        <MainButton text={"보내기"} onClick={toggleReplyModal} />
      </div>
      <Modal
        contents={[
          {
            title: "답장을 보내시겠어요?",
          },
        ]}
        confirmText={"완료"}
        cancelText={"취소"}
        onConfirm={handleConfirmReply}
        onCancel={toggleReplyModal}
        isOpen={isReplyModalOpen}
      />
    </div>
  );
};

export default Index;
