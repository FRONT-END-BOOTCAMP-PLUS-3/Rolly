import classNames from "classnames";
import styles from "./RollyItem.module.scss";
import useToggle from "@/hooks/useToggle";
import Modal from "../modal/Modal";
import { useEffect, useState } from "react";
import Image from "next/image";

type RollyItemProps = {
  title: string;
  date: string;
  id: number;
  variant: "created" | "saved";
  onClick: () => void;
  onLock?: (id: number) => Promise<void>;
  onDelete?: () => void;
  onReply?: () => void;
  isLocked: boolean; // 잠금 상태 전달
};

const RollyItem: React.FC<RollyItemProps> = ({
  id,
  title,
  date,
  variant,
  onClick,
  onReply,
  onDelete,
  onLock,
  isLocked: initialIsLocked, // props로 받은 초기 잠금 상태
}) => {
  // variant를 상태로 저장하여 변경되지 않도록 고정
  const [variantType] = useState(variant);
  const isCreated = variantType === "created";

  const [isLockModalOpen, toggleLockModal] = useToggle(false); // Lock 모달
  const [isDeleteModalOpen, toggleDeleteModal] = useToggle(false); // Delete 모달

  // 실제 isLocked 상태를 useState로 관리
  const [isLocked, setIsLocked] = useState(initialIsLocked);
  // Supabase에서 가져온 잠금 상태가 변경되면 업데이트
  useEffect(() => {
    setIsLocked(initialIsLocked);
  }, [initialIsLocked]);

  const handleConfirmLock = async () => {
    if (onLock) {
      await onLock(id); // Supabase 업데이트
      setIsLocked(true); // 로컬 상태 업데이트
    }
    toggleLockModal();
  };

  const handleConfirmDelete = () => {
    if (onDelete) onDelete();
    toggleDeleteModal();
  };

  const handleListClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (isLockModalOpen || isDeleteModalOpen) {
      event.stopPropagation();
      return;
    }
    if (!target.closest(".lock") && !target.closest(".action")) {
      onClick();
    }
  };
  return (
    <div className={styles["rolly-list-item"]} onClick={handleListClick}>
      <div className={styles["wrapper"]}>
        <p className={styles["title"]}>{title}</p>
        {/* lock 버튼: isCreated가 true일 때만 표시하고, isLocked 상태가 되면 안 보이도록 */}
        {isCreated && !isLocked && (
          <button
            className={classNames("lock", styles.lock)}
            onClick={toggleLockModal}
          >
            <Image
              src="/icons/lock.svg"
              width={24}
              height={24}
              alt="Lock"
              className={styles["lock"]}
            />
          </button>
        )}
      </div>
      <div className={styles["wrapper"]}>
        <p className={styles["date"]}>{date}</p>
        {isCreated && !isLocked ? (
          <button
            className={classNames("action", styles.action)}
            onClick={toggleDeleteModal}
          >
            <Image
              src="/icons/delete.svg"
              width={24}
              height={24}
              alt="delete"
            />
          </button>
        ) : (
          isLocked &&
          onReply && (
            <button
              className={classNames("action", styles.action)}
              onClick={onReply}
            >
              <Image
                src="/icons/reply.svg"
                width={24}
                height={24}
                alt="reply"
              />
            </button>
          )
        )}
      </div>

      <Modal
        contents={[
          {
            title: "롤리를 완성하시겠어요?",
            body: "완성 후에는 메세지 작성 및 롤리 삭제가 불가해요!",
          },
        ]}
        confirmText={"완성"}
        cancelText={"취소"}
        onConfirm={handleConfirmLock}
        onCancel={toggleLockModal}
        isOpen={isLockModalOpen}
      />

      <Modal
        contents={[
          {
            title: "롤리를 삭제하시겠어요?",
          },
        ]}
        confirmText={"삭제"}
        cancelText={"취소"}
        onConfirm={handleConfirmDelete}
        onCancel={toggleDeleteModal}
        isOpen={isDeleteModalOpen}
      />
    </div>
  );
};

export default RollyItem;
