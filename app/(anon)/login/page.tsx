"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthInput from "@/components/authInput/AuthInput";
import MainButton from "@/components/mainButton/MainButton";
import BackButton from "@/components/backButton/BackButton";
import Alert from "@/components/alert/Alert";
import styles from "./page.module.scss";
import supabase from "@/utils/supabase/supabaseClient";
import useUserStore from "@/application/state/useUserStore";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const { setUserData } = useUserStore();

  useEffect(() => {
    setIsFormComplete(!!(email && password));
  }, [email, password]);

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        console.error("로그인 중 오류 발생:", error.message);
        if (error.message.toLowerCase().includes("invalid login credentials")) {
          setAlertTitle("이메일 혹은 비밀번호가 맞지 않습니다.");
          setErrorMessage("다시 확인해주세요!");
        } else {
          setAlertTitle("로그인 도중 오류가 발생했습니다.");
          setErrorMessage("잠시 후 다시 시도해주세요!");
        }
        setAlertOpen(true);
        return;
      }
      const userId = data.user.id;
      const response = await fetch(`/api/users?userId=${userId}`);
      const { success, UserInfoDto } = await response.json();
      if (success)
        setUserData({
          userId: UserInfoDto.id,
          userEmail: UserInfoDto.email,
          userName: UserInfoDto.name,
        });

      if (data.session) {
        // 세션 정보를 sessionStorage에 저장
        sessionStorage.setItem(
          "supabase.auth.token",
          JSON.stringify(data.session)
        );
        // localStorage에서 인증 관련 데이터 제거
        await supabase.auth.signOut();
        router.push("/member");
      }
    } catch (error) {
      console.error("로그인 중 예외 발생:", error);
      setAlertTitle("로그인 도중 오류가 발생했습니다.");
      setErrorMessage("잠시 후 다시 시도해주세요!");
      setAlertOpen(true);
    }
  };

  const closeAlert = () => setAlertOpen(false);

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
        <Alert
          title={alertTitle}
          body={errorMessage}
          isOpen={isAlertOpen}
          onClose={closeAlert}
        />
      </div>
      <div className={styles["login-footer"]}>
        <span className={styles["signup-link"]}>
          처음 오셨다면 <a href="/signup">간편 회원가입</a> 하세요!
        </span>
      </div>
      <MainButton
        text="로그인"
        onClick={handleLogin}
        disabled={!isFormComplete}
      />
    </div>
  );
};

export default Login;
