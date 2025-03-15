"use client";

import BackButton from "@/components/backButton/BackButton";
import CreateRollyButton from "@/components/createRollyButton/CreateRollyButton";
import Header from "@/components/header/Header";
import RollyItem from "@/components/rollyItem/RollyItem";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CreatedRollyDto } from "@/application/usecases/rolly/dto/CreatedRollyDto";
import useUserStore from "@/application/state/useUserStore";
import useToggle from "@/hooks/useToggle";
import Modal from "@/components/modal/Modal";
import useRollyCreateStore from "@/application/state/useRollyCreateStore";
import { InputFormData } from "@/components/modal/Modal.type";

const CreatedRollies: React.FC = () => {
  const [rollyItems, setRollyItems] = useState<CreatedRollyDto[]>([]);
  const [isCreateRollyModalOpen, toggleCreateRollyModal] = useToggle(false);
  const { setType, setTitle } = useRollyCreateStore();
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

  const handleConfirm = (inputFormData?: InputFormData) => {
    if (
      inputFormData &&
      inputFormData.modal_radio &&
      inputFormData.modal_text
    ) {
      switch (inputFormData.modal_radio) {
        case "개인용":
          setType(1);
          break;
        case "단체용":
          setType(2);
          break;
        default:
          break;
      }
      setTitle(inputFormData.modal_text);
    }
    router.push("/member/rollies/create");
  };

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
        <CreateRollyButton
          onClick={toggleCreateRollyModal}
          className={styles["create-rolly-btn"]}
        />
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
      <Modal
        contents={[
          {
            title: "롤리의 타입을 선택해주세요",
            body: "개인용은 받는 사람이 답장할 수 있어요!",
            input: "radio",
            radioOptions: ["개인용", "단체용"],
          },
          {
            title: "롤리의 이름을 작성해주세요",
            body: "최대 12자까지 가능해요!",
            input: "text",
            maxLength: 12,
          },
        ]}
        onConfirm={handleConfirm}
        onCancel={toggleCreateRollyModal}
        isOpen={isCreateRollyModalOpen}
      />
    </div>
  );
};

export default CreatedRollies;
