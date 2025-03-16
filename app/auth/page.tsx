"use client";

import styles from "./page.module.scss";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import useUserStore from "@/application/state/useUserStore";
import Loading from "@/components/loading/Loading";

const AuthCallbackClient = () => {
  const router = useRouter();
  const { setUserData } = useUserStore();

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();

      const { data } = await supabase.auth.getUser();

      if (data.user) {
        const userId = data.user.id;
        const response = await fetch(`/api/users?userId=${userId}`);
        const { success, UserInfo } = await response.json();

        if (success) {
          setUserData({
            userId: UserInfo.id,
            userEmail: UserInfo.email,
            userName: UserInfo.name,
          });
        }
      }

      // 원래 가려던 페이지로 이동
      const redirectPath = `/member${sessionStorage.getItem("redirectPath") || ""}`;
      router.push(redirectPath);
    };

    fetchUser();
  }, [router, setUserData]);

  return (
    <>
      <Loading />
      <p className={styles["notice"]}>로그인 처리 중...</p>
    </>
  );
};

export default AuthCallbackClient;
