import styles from "./ScrollContainer.module.scss";

const ScrollContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles["scroll-container"]}>{children}</div>;
};

export default ScrollContainer;
