"use client";

import styles from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useToggle from "@/hooks/useToggle";
import useUserStore from "@/application/state/useUserStore";
import useRollyCreateStore from "@/application/state/useRollyCreateStore";
import CreateRollyButton from "@/components/createRollyButton/CreateRollyButton";
import Modal from "@/components/modal/Modal";
import { InputFormData } from "@/components/modal/Modal.type";

const Index = () => {
  const router = useRouter();
  const [isModalOpen, toggleModal] = useToggle(false);
  const [isAsideOpen, toggleAside] = useToggle(false);
  const { setType, setTitle } = useRollyCreateStore();
  const { userName } = useUserStore();

  const handleConfirm = (inputFormData?: InputFormData) => {
    if (
      inputFormData &&
      inputFormData.modal_radio &&
      inputFormData.modal_text
    ) {
      switch (inputFormData.modal_radio) {
        case "개인용":
          setType(1);
          break;
        case "단체용":
          setType(2);
          break;
        default:
          break;
      }
      setTitle(inputFormData.modal_text);
    }
    router.push("/member/rollies/create");
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleAside}
        className={styles["hamburger-btn"]}
      >
        <Image
          src="/icons/hamburger.svg"
          width={24}
          height={24}
          alt="햄버거 버튼"
        />
      </button>
      <div className={styles["center-container"]}>
        <Image
          src="/images/mascot.svg"
          width={500}
          height={320}
          alt="롤리 마스코트"
        />
      </div>
      <CreateRollyButton
        onClick={toggleModal}
        className={styles["create-rolly-btn"]}
      />

      <Aside userName={userName} onClose={toggleAside} isOpen={isAsideOpen} />

      <Modal
        contents={[
          {
            title: "롤리의 타입을 선택해주세요",
            body: "개인용은 받는 사람이 답장할 수 있어요!",
            input: "radio",
            radioOptions: ["개인용", "단체용"],
          },
          {
            title: "롤리의 이름을 작성해주세요",
            body: "최대 12자까지 가능해요!",
            input: "text",
            maxLength: 12,
          },
        ]}
        onConfirm={handleConfirm}
        onCancel={toggleModal}
        isOpen={isModalOpen}
      />
    </>
  );
};

export default Index;

type AsideProps = {
  userName: string;
  onClose: () => void;
  isOpen: boolean;
};

const Aside = ({ userName, onClose, isOpen }: AsideProps) => {
  return (
    <div
      className={`${styles["aside-container"]} ${isOpen ? styles["open"] : ""}`}
      onClick={onClose}
    >
      <aside className={styles["aside"]} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles["close"]} onClick={onClose}>
          <Image
            src="icons/close.svg"
            width={24}
            height={24}
            alt="Aside 닫기"
          />
        </button>
        <p className={styles["user"]}>
          <span className={styles["user-name"]}>{userName}</span> 님
        </p>
        <ul className={styles["menu"]}>
          <li className={styles["menu-group"]}>
            <ul>
              <li>
                <Link href="">⚙️ 계정 설정</Link>
              </li>
              <li>
                <Link href="/member/rollies/created">✉️ 내가 만든 롤리</Link>
              </li>
              <li>
                <Link href="/member/rollies/saved">💌 내가 받은 롤리</Link>
              </li>
            </ul>
          </li>
          <li className={styles["menu-group"]}>
            <ul>
              <li>
                <Link href="/member/rollies/saved">💬 문의하기</Link>
              </li>
            </ul>
          </li>
        </ul>
        <p className={styles["logout"]}>로그아웃</p>
      </aside>
    </div>
  );
};
