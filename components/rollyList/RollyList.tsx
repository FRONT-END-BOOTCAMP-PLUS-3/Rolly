"use client";
import styles from "./RollyList.module.scss";

interface RollyListProps {
  title: string;
  date: string;
  onListClick: () => void;
  lockBtn?: {
    onClick: () => void;
  };
  actionBtn: {
    icon: string;
    onClick: () => void;
  };
}

const RollyList: React.FC<RollyListProps> = ({
  title,
  date,
  lockBtn,
  actionBtn,
  onListClick,
}) => {
  const handleListClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    if (!target.closest(".lock") && !target.closest(".action")) {
      onListClick();
    }
  };
  return (
    <div className={`${styles["rolly-list"]}`} onClick={handleListClick}>
      <div className={styles["list"]}>
        <p className={styles["title"]}>{title}</p>
        {lockBtn && (
          <button
            className="lock"
            onClick={(event) => {
              event.stopPropagation();
              lockBtn?.onClick();
            }}
          >
            <img src="/icons/lock.svg" alt="Lock" className={styles["lock"]} />
          </button>
        )}
      </div>
      <div className={styles["list"]}>
        <p className={styles["date"]}>{date}</p>
        {actionBtn && (
          <button
            className="action"
            onClick={(event) => {
              event.stopPropagation();
              actionBtn.onClick();
            }}
          >
            <img src={actionBtn.icon} alt="Lock" className={styles["action"]} />
          </button>
        )}
      </div>
    </div>
  );
};

export default RollyList;
