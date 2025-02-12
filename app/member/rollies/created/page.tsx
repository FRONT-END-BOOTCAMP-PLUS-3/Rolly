"use client";

import BackButton from "@/components/backButton/BackButton";
import CreateRollyButton from "@/components/createRollyButton/CreateRollyButton";
import Header from "@/components/header/Header";
import RollyItem from "@/components/rollyItem/RollyItem";
import styles from "./page.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CreatedRollyDto } from "@/application/usecases/rolly/dto/CreatedRollyDto";
import useUserStore from "@/application/state/useUserStore";

const CreatedRollies: React.FC = () => {
  const [rollyItems, setRollyItems] = useState<CreatedRollyDto[]>([]);
  const { userId } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const fetchCreatedRollies = async () => {
      const response = await fetch(`/api/rollies?userId=${userId}`);
      const data = await response.json();
      console.log(data);
      setRollyItems(data);
    };
    fetchCreatedRollies();
  }, [userId]);

  const handleItemClick = (id: number) => {
    router.push(`/member/rollies/${id}`);
  };

  const handleLock = async (id: number) => {
    await fetch(`/api/rollies/${id}`, {
      method: "PUT",
    });
    setRollyItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isLocked: true } : item))
    );
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/rollies/${id}`, {
      method: "DELETE",
    });

    setRollyItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div className={styles["header"]}>
        <Header leftContent={<BackButton />} title="내가 만든 롤리" />
      </div>
      <div className={styles["create-rolly-button"]}>
        <Link href={"/member/rollies/create/"}>
          <CreateRollyButton />
        </Link>
      </div>
      <p className={styles["list-title"]}>롤리 리스트</p>
      <div className={styles["list"]}>
        {rollyItems.map((rollyItem) => (
          <RollyItem
            key={rollyItem.id}
            id={rollyItem.id}
            title={rollyItem.title}
            date={rollyItem.createdAt.toString().slice(0, 10)}
            onClick={() => handleItemClick(rollyItem.id)}
            variant={"created"}
            onLock={() => handleLock(rollyItem.id)}
            onDelete={() => handleDelete(rollyItem.id)}
            isLocked={rollyItem.isLocked}
          />
        ))}
      </div>
    </div>
  );
};

export default CreatedRollies;
