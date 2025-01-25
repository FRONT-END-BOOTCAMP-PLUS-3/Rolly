"use client";
import styles from "./RollyListItem.module.scss";

interface RollyListItemProps {
  title: string;
  date: string;
  onClick: () => void;
  variant: "created" | "saved";
  lockBtn?: {
    onLock: () => void;
  };
  actionBtn: {
    onDelete: () => void; // 삭제 버튼 동작
    onReply: () => void; // 답장 버튼 동작
  };
}

const RollyListItem: React.FC<RollyListItemProps> = ({
  title,
  date,
  onClick,
  variant,
  lockBtn,
  actionBtn,
}) => {
  const isCreated = variant === "created";
  const btnIcon = isCreated ? "/icons/delete.svg" : "/icons/reply.svg";
  const btnHandler = isCreated ? actionBtn.onDelete : actionBtn.onReply;

  const handleListClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    if (!target.closest(".lock") && !target.closest(".action")) {
      onClick();
    }
  };
  return (
    <div className={styles["rolly-list-item"]} onClick={handleListClick}>
      <div className={styles["list"]}>
        <p className={styles["title"]}>{title}</p>
        {lockBtn && isCreated && (
          <button
            className="lock"
            onClick={(event) => {
              event.stopPropagation();
              lockBtn?.onLock();
            }}
          >
            <img src="/icons/lock.svg" alt="Lock" className={styles["lock"]} />
          </button>
        )}
      </div>
      <div className={styles["list"]}>
        <p className={styles["date"]}>{date}</p>
        <button className="action" onClick={btnHandler}>
          <img src={btnIcon} alt="isCreated" className={styles["action"]} />
        </button>
      </div>
    </div>
  );
};

export default RollyListItem;
