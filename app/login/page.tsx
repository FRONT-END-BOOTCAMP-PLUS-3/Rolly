"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AuthInput from "@/components/authInput/AuthInput";
import MainButton from "@/components/mainButton/MainButton";
import BackButton from "@/components/backButton/BackButton";
import styles from "./page.module.scss";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      // 로그인 로직 추가 예정
      const isValid = true; // 임시 로직
      if (isValid) {
        router.push("/intro");
      } else {
        setErrorMessage("이메일 또는 비밀번호가 잘못되었습니다.");
      }
    } catch {
      setErrorMessage("로그인 중 오류가 발생했습니다.");
    }
  };

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
          placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능해요"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorMessage && (
          <p className={styles["error-message"]}>{errorMessage}</p>
        )}
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
