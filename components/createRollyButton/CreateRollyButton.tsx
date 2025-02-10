"use client";
import styles from "./CreateRollyButton.module.scss";

interface CreateRollyButtonProps {
  onClick?: () => void;
  className?: string;
}

const CreateRollyButton: React.FC<CreateRollyButtonProps> = ({
  onClick,
  className,
}) => {
  return (
    <button
      type="button"
      className={`${styles["create-rolly-button"]} ${className}`}
      onClick={onClick}
    >
      <img src="/icons/create-rolly.svg" alt="롤리 만들기!" />
      <p>롤리 만들기!</p>
    </button>
  );
};

export default CreateRollyButton;
