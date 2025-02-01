"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AuthInput from "@/components/authInput/AuthInput";
import MainButton from "@/components/mainButton/MainButton";
import BackButton from "@/components/backButton/BackButton";
import styles from "./page.module.scss";

const SignUp = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async () => {
    if (!nickname || !email || !password) {
      setErrorMessage("모든 필드를 입력해주세요.");
      return;
    }

    try {
      // 회원가입 로직 추가 예정
      const isSuccess = true; // 임시 로직
      if (isSuccess) {
        router.push("/intro");
      } else {
        setErrorMessage("회원가입에 실패했습니다.");
      }
    } catch {
      setErrorMessage("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles["signup-container"]}>
      <div className={styles["signup-header"]}>
        <BackButton />
        <div className={styles["signup-title"]}>회원가입</div>
      </div>

      <div className={styles["signup-body"]}>
        <AuthInput
          label="닉네임"
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <AuthInput
          label="이메일"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <AuthInput
          label="비밀번호"
          placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorMessage && (
          <p className={styles["error-message"]}>{errorMessage}</p>
        )}
      </div>

      <div className={styles["signup-footer"]}>
        <MainButton text="회원가입" onClick={handleSignUp} />
      </div>
    </div>
  );
};

export default SignUp;
