"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

interface HomeButtonProps {
  onClick?: () => void;
}

const HomeButton: React.FC<HomeButtonProps> = ({ onClick }) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    router.push("/");
  };

  return (
    <button onClick={handleClick}>
      <Image src="/icons/home.svg" width={24} height={24} alt="home button" />
    </button>
  );
};

export default HomeButton;
