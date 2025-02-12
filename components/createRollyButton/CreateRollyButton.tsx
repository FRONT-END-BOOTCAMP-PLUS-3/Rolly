"use client";
import Image from "next/image";
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
      <Image
        src="/icons/create-rolly.svg"
        width={24}
        height={24}
        alt="롤리 만들기!"
      />
      <p>롤리 만들기!</p>
    </button>
  );
};

export default CreateRollyButton;
