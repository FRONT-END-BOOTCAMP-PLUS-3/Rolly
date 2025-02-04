"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AuthInput from "@/components/authInput/AuthInput";
import MainButton from "@/components/mainButton/MainButton";
import BackButton from "@/components/backButton/BackButton";
import Modal from "@/components/modal/Modal";
import styles from "./page.module.scss";
import supabase from "@/utils/supabase/supabaseClient";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("이메일과 비밀번호를 입력해주세요.");
      setModalOpen(true);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;

      console.log("로그인 성공:", data);
      router.push("/intro");
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      if (error instanceof Error) {
        setErrorMessage(error.message || "로그인 중 오류가 발생했습니다.");
      } else {
        setErrorMessage("로그인 중 오류가 발생했습니다.");
      }
      setModalOpen(true);
    }
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-header"]}>
        <BackButton />
        <div className={styles["login-title"]}>로그인</div>
      </div>

      <div className={styles["login-body"]}>
        <AuthInput
          label="이메일"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <AuthInput
          label="비밀번호"
          placeholder="8자 이상이며, 숫자와 특수문자를 포함해야 합니다."
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Modal
          contents={[
            {
              title: "로그인 오류",
              body: errorMessage,
            },
          ]}
          onConfirm={closeModal}
          onCancel={closeModal}
          isOpen={isModalOpen}
          confirmText="확인"
          cancelText="닫기"
        />
      </div>

      <div className={styles["login-footer"]}>
        <div className={styles["signup-link"]}>
          처음 오셨다면 <a href="/signup">간편 회원가입</a> 하세요!
        </div>
        <MainButton text="로그인" onClick={handleLogin} />
      </div>
    </div>
  );
};

export default Login;
