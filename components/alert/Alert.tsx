import Image from "next/image";
import styles from "./Alert.module.scss";

type AlertProps = {
  title: string;
  body: string;
  isOpen: boolean;
  onClose: () => void;
  type?: "success" | "error";
};

const Alert = ({
  title,
  body,
  isOpen,
  onClose,
  type = "error",
}: AlertProps) => {
  if (!isOpen) return null;

  const titleColor =
    type === "success" ? "var(--color-success)" : "var(--color-error)";

  return (
    <div className={styles["alert-container"]} onClick={onClose}>
      <div className={styles["alert"]} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles["alert-title"]} style={{ color: titleColor }}>
          {title}
        </h2>
        <p>{body}</p>
        <button className={styles["close-btn"]} onClick={onClose}>
          <Image src="/icons/close.svg" width={24} height={24} alt="닫기" />
        </button>
      </div>
    </div>
  );
};

export default Alert;
