import styles from "./ItemBox.module.scss";

interface ItemBoxProps {
  variant: "text" | "image"; // 두 가지 스타일 선택
  children: React.ReactNode;
}

const ItemBox: React.FC<ItemBoxProps> = ({ variant, children }) => {
  return (
    <button className={`${styles["item-box"]} ${styles[variant]}`}>
      {children}
    </button>
  );
};

export default ItemBox;

// usage
// <ItemBox variant="text">온글잎 박다현체</ItemBox>
// <ItemBox variant="image"><img src=""/></ItemBox>
