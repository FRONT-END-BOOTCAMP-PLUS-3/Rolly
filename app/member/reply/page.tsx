"use client";
import BackButton from "@/components/backButton/BackButton";
import Header from "@/components/header/Header";
import styles from "./page.module.scss";
import MainButton from "@/components/mainButton/MainButton";
import useToggle from "@/hooks/useToggle";
import Modal from "@/components/modal/Modal";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { WriterEmailDto } from "@/application/usecases/postit/dto/WriterEmailDto";
import { useRouter } from "next/navigation";

const Reply = () => {
  const router = useRouter();
  const [isReplyModalOpen, toggleReplyModal] = useToggle(false);
  const [isBackModalOpen, toggleBackModal] = useToggle(false);
  const [emails, setEmails] = useState<WriterEmailDto[]>([]);
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState("");
  const searchParams = useSearchParams();
  const rollyId = searchParams.get("rollyId");

  useEffect(() => {
    const fetchWriterEmails = async () => {
      const response = await fetch(`/api/postits/emails?rollyId=${rollyId}`);
      const data = await response.json();
      if (data.success && Array.isArray(data.writerEmailDto)) {
        setEmails(data.writerEmailDto); // writerEmailDto 배열만 저장
      } else {
        setEmails([]); // 데이터가 없으면 빈 배열
      }
    };
    fetchWriterEmails();
  }, [rollyId]);

  const handleConfirm = async () => {
    try {
      const response = await fetch("/api/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: sender, // 여기에 로그인된 사용자 이메일 사용
          receiverEmails: emails.map((email) => email.writerEmail),
          message,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSender("");
        setMessage("");
        toggleReplyModal();
        router.push("/member/rollies/saved");
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("이메일 전송 실패:", error);
      alert("이메일 전송에 실패했습니다.");
    }
  };

  const navigateBack = () => {
    router.push("/member/rollies/saved");
  };
  return (
    <Suspense>
      <Header
        leftContent={<BackButton onClick={toggleBackModal} />}
        title="답장"
      />
      <input
        className={styles["sender"]}
        type="text"
        placeholder="보내는 분의 성함을 입력해주세요"
        value={sender}
        onChange={(e) => setSender(e.target.value)}
      />
      <textarea
        className={styles["textarea"]}
        maxLength={100}
        rows={5}
        cols={50}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="답장을 작성해주세요(최대 100자)"
      />
      <div className={styles["reply-button"]}>
        <MainButton
          text={"보내기"}
          onClick={toggleReplyModal}
          disabled={!message.trim()}
        />
      </div>
      <Modal
        contents={[
          {
            title: "답장을 보내시겠어요?",
          },
        ]}
        confirmText={"완료"}
        cancelText={"취소"}
        onConfirm={handleConfirm}
        onCancel={toggleReplyModal}
        isOpen={isReplyModalOpen}
      />
      <Modal
        contents={[
          {
            title: "답장 작성하기를 중단하시겠어요?",
            body: "지금까지 작성한 내용이 삭제돼요!",
          },
        ]}
        onConfirm={navigateBack}
        onCancel={toggleBackModal}
        isOpen={isBackModalOpen}
        confirmText="확인"
      />
    </Suspense>
  );
};

export default Reply;
