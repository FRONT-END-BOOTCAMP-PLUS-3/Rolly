"use client";
import styles from "./CreateRollyButton.module.scss";

interface CreateRollyButton {
  onClick?: () => void;
}

const CreateRollyButton: React.FC<CreateRollyButton> = ({ onClick }) => {
  return (
    <button className={styles["create-rolly-button"]} onClick={onClick}>
      <img
        src="/icons/rollyCreate.svg" //
        alt="롤리 만들기!"
      />
      <p>롤리 만들기!</p>
    </button>
  );
};

export default CreateRollyButton;
