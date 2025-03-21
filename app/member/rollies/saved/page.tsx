"use client";

import BackButton from "@/components/backButton/BackButton";
import Header from "@/components/header/Header";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RollyItem from "@/components/rollyItem/RollyItem";
import { SavedRollyDto } from "@/application/usecases/rolly/dto/SavedRollyDto";
import useUserStore from "@/application/state/useUserStore";

const SavedRollies = () => {
  const [rollyItems, setRollyItems] = useState<SavedRollyDto[]>([]);
  const { userId } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const fetchSavedRollies = async () => {
      const response = await fetch(`/api/saves?userId=${userId}`);
      const data = await response.json();
      setRollyItems(data);
    };

    fetchSavedRollies();
  }, [userId]);

  const navigateToRolly = (id: number) => {
    router.push(`/member/rollies/${id}`);
  };

  const navigateToReply = (id: number) => {
    router.push(`/member/reply?rollyId=${id}`);
  };
  const navigateToHome = () => {
    router.push(`/member`);
  };
  return (
    <div>
      <div className={styles["header"]}>
        <Header
          leftContent={<BackButton onClick={navigateToHome} />}
          title="내가 받은 롤리"
        />
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
            onReply={
              rollyItem.typeId === 1
                ? () => navigateToReply(rollyItem.id)
                : undefined
            }
            isLocked={true}
          />
        ))}
      </div>
    </div>
  );
};
export default SavedRollies;
