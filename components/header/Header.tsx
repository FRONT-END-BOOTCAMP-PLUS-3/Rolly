import styles from "./Header.module.scss";

type HeaderProps = {
  title?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
};

const Header: React.FC<HeaderProps> = ({
  title,
  leftContent,
  rightContent,
}) => {
  return (
    <div className={styles["header"]}>
      <div>{leftContent}</div>
      <h2 className={styles["header-title"]}>{title}</h2>
      <div className={styles["right-content"]}>{rightContent}</div>
    </div>
  );
};

export default Header;
