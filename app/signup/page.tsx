"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AuthInput from "@/components/authInput/AuthInput";
import MainButton from "@/components/mainButton/MainButton";
import BackButton from "@/components/backButton/BackButton";
import styles from "./page.module.scss";
import supabase from "@/utils/supabase/supabaseClient";

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateSignUpInput = (
    name: string,
    email: string,
    password: string
  ) => {
    if (!name || !email || !password) {
      setErrorMessage("모든 필드를 입력해주세요.");
      return false;
    }
    return true;
  };

  const performSignUp = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });

      if (error) throw error;

      console.log("회원가입 성공:", data.user);
      router.push("/intro");
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
      setErrorMessage((error as Error).message);
    }
  };

  const handleSignUp = async () => {
    if (validateSignUpInput(name, email, password)) {
      await performSignUp();
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
          value={name}
          onChange={(e) => setName(e.target.value)}
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
