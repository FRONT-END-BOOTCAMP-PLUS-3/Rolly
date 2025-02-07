"use client";

import BackButton from "@/components/backButton/BackButton";
import Header from "@/components/header/Header";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RollyItem from "@/components/rollyItem/RollyItem";
import SavedRollyDto from "@/application/usecases/rolly/dto/SavedRollyDto";
import useUserIdStore from "@/application/state/useUserIdStore";

const Index: React.FC = () => {
  const [rollyItems, setRollyItem] = useState<SavedRollyDto[]>([]);
  const router = useRouter();

  useEffect(() => {
    const userId = useUserIdStore.getState().userId;
    const fetchData = async () => {
      const response = await fetch(`/api/saves?userId=${userId}`);
      const data = await response.json();
      setRollyItem(data);
    };

    fetchData();
  }, []);

  const navigateToRolly = (id: number) => {
    router.push(`/member/rollies/${id}`);
  };

  const navigateToReply = () => {
    router.push(`/member/reply/`);
  };
  return (
    <div>
      <div className={styles["header"]}>
        <Header leftContent={<BackButton />} title="내가 받은 롤리" />
      </div>
      <p className={styles["list-title"]}>롤리 리스트</p>
      <div className={styles["list"]}>
        {rollyItems.map((rollyItem) => (
          <RollyItem
            key={rollyItem.id}
            id={rollyItem.id}
            title={rollyItem.title}
            date={rollyItem.createdAt.slice(0, 10)}
            onClick={() => navigateToRolly(rollyItem.id)}
            variant={"saved"}
            onReply={rollyItem.typeId === 1 ? navigateToReply : undefined}
            isLocked={true}
          />
        ))}
      </div>
    </div>
  );
};
export default Index;
