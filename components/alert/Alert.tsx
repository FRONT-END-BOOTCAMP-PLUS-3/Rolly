import styles from "./Alert.module.scss";

type AlertProps = {
  title: string;
  body: string;
  isOpen: boolean;
  onClose: () => void;
};

const Alert = ({ title, body, isOpen, onClose }: AlertProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles["alert-container"]} onClick={onClose}>
      <div className={styles["alert"]} onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <p>{body}</p>
        <button className={styles["close-btn"]} onClick={onClose}>
          <img src="/icons/close.svg" alt="닫기" />
        </button>
      </div>
    </div>
  );
};

export default Alert;
