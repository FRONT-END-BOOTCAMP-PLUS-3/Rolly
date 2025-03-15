"use client";

import React, { useState, useEffect } from "react";
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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormComplete, setIsFormComplete] = useState(false);

  useEffect(() => {
    setIsFormComplete(!!(name && email && password && confirmPassword));
  }, [name, email, password, confirmPassword]);

  const validateSignUpInput = () => {
    // 이메일 형식 검사
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("유효하지 않은 이메일 주소입니다.");
      return false;
    }
    // 비밀번호 검증 로직 직접 구현 (대소문자 구분 없음)
    if (!/(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(password)) {
      setErrorMessage(
        "비밀번호는 8자 이상이며, 숫자와 특수문자를 포함해야 합니다."
      );
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return false;
    }
    if (name.length < 3 || name.length > 10) {
      setErrorMessage("닉네임은 3자 이상 10자 이하이어야 합니다.");
      return false;
    }
    return true;
  };

  const performSignUp = async () => {
    if (!validateSignUpInput()) return;

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });

      if (error) throw error;

      console.log("회원가입 성공:", data.user);
      router.push("/login");
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
      setErrorMessage((error as Error).message);
    }
  };

  const handleSignUp = async () => {
    await performSignUp();
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
          placeholder="닉네임을 입력해주세요."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <AuthInput
          label="이메일"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <AuthInput
          label="비밀번호"
          placeholder="8자 이상이며, 숫자와 특수문자를 포함해야 합니다."
          type="password" // 비밀번호 암호화
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <AuthInput
          label="비밀번호 확인"
          placeholder="비밀번호를 한번 더 입력해주세요."
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {errorMessage && (
          <p className={styles["error-message"]}>{errorMessage}</p>
        )}
      </div>

      <div className={styles["signup-footer"]}>
        <MainButton
          text="회원가입"
          onClick={handleSignUp}
          disabled={!isFormComplete}
        />
      </div>
    </div>
  );
};

export default SignUp;
