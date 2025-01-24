import styles from "./BottomSheet.module.scss";

const BottomSheet = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles["bottom-sheet"]}>{children}</div>;
};

export default BottomSheet;
