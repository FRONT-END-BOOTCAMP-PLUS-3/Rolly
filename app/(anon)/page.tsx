"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

const Index = () => {
  const supabase = createClient();

  const logInWithKakao = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: { prompt: "login" },
      },
    });

    if (error) throw error.message;
  };

  return (
    <>
      <Image
        src="/images/main.svg"
        width={390}
        height={320}
        className={styles["main-img"]}
        alt="롤리 메인 이미지"
      />
      <div className={styles["login-wrapper"]}>
        <p className={styles["login-prompt"]}>sns 계정으로 간편 로그인</p>
        <ul>
          <li>
            <button
              type="button"
              className={styles["kakao-login-btn"]}
              onClick={logInWithKakao}
            >
              <Image
                src="/icons/kakao.svg"
                width={20}
                height={20}
                alt="카카오 로고"
              />
              카카오로 계속하기
            </button>
          </li>
          <li>
            <button type="button" className={styles["google-login-btn"]}>
              <Image
                src="/icons/google.svg"
                width={20}
                height={20}
                alt="구글 로고"
              />
              구글로 계속하기
            </button>
          </li>
        </ul>
        <div className={styles["links"]}>
          <Link href="/login">이메일로 로그인</Link>
          <span className={styles["separator"]}>|</span>
          <Link href="/signup">회원가입</Link>
        </div>
      </div>
    </>
  );
};

export default Index;
