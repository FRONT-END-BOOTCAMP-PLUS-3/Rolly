"use client";

import BackButton from "@/components/backButton/BackButton";
import CreateRollyButton from "@/components/createRollyButton/CreateRollyButton";
import Header from "@/components/header/Header";
import RollyListItem from "@/components/rollyListItem/RollyListItem";
import styles from "./page.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CreatedRollyDto from "@/application/usecases/rolly/dto/CreatedRollyDto";

const Index: React.FC = () => {
  const [rollyListItems, setRollyListItem] = useState<CreatedRollyDto[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/rollies");
      const data = await response.json();
      setRollyListItem(data);
    };
    fetchData();
  }, []);

  const handleItemClick = (id: number) => {
    router.push(`/member/rollies/${id}`);
  };

  const handleLock = async (id: number) => {
    await fetch(`/api/rollies/${id}`, {
      method: "POST",
    });
    setRollyListItem((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isLocked: true } : item))
    );
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/rollies/${id}`, {
      method: "DELETE",
    });

    setRollyListItem((prev) => prev.filter((item) => item.id !== id));
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
        {rollyListItems.map((rollyListItem) => (
          <RollyListItem
            key={rollyListItem.id}
            id={rollyListItem.id}
            title={rollyListItem.title}
            date={rollyListItem.createAt.toString().slice(0, 10)}
            onClick={() => handleItemClick(rollyListItem.id)}
            variant={"created"}
            onLock={() => handleLock(rollyListItem.id)}
            onDelete={() => handleDelete(rollyListItem.id)}
            isLocked={rollyListItem.isLocked}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
