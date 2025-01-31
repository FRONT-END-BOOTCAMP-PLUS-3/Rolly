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
      <h2 className="text">{title}</h2>
      <div>{rightContent}</div>
    </div>
  );
};

export default Header;
