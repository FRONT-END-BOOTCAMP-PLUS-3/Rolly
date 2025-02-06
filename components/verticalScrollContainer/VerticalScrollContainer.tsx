import styles from "./VerticalScrollContinaer.module.scss";

const ScrollContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${styles["vertical-scroll-container"]} `}>{children}</div>
  );
};

export default ScrollContainer;
