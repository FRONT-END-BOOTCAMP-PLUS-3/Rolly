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
  const [isCreateRollyModalOpen, toggleCreateRollyModal] = useToggle(false);
  const [isLogoutModalOpen, toggleLogoutModal] = useToggle(false);
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

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });

    // 쿠키 삭제
    document.cookie.split(";").forEach(function (c) {
      document.cookie =
        c.trim().split("=")[0] +
        "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    });

    // 로컬스토리지, 세션스토리지 삭제
    localStorage.clear();
    sessionStorage.clear();

    router.push("/");
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

      <Image
        src="/images/main.png"
        width={390}
        height={320}
        className={styles["main-img"]}
        alt="롤리 메인 이미지"
      />

      <CreateRollyButton
        onClick={toggleCreateRollyModal}
        className={styles["create-rolly-btn"]}
      />

      <Aside
        userName={userName}
        onClose={toggleAside}
        isOpen={isAsideOpen}
        toggleLogoutModal={toggleLogoutModal}
      />

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
        onCancel={toggleCreateRollyModal}
        isOpen={isCreateRollyModalOpen}
      />

      <Modal
        contents={[
          {
            title: "로그아웃 하시겠어요?",
          },
        ]}
        onConfirm={handleLogout}
        onCancel={toggleLogoutModal}
        isOpen={isLogoutModalOpen}
        confirmText="로그아웃"
      />
    </>
  );
};

export default Index;

type AsideProps = {
  userName: string;
  onClose: () => void;
  isOpen: boolean;
  toggleLogoutModal: () => void;
};

const Aside = ({
  userName,
  onClose,
  isOpen,
  toggleLogoutModal,
}: AsideProps) => {
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
        <button className={styles["logout"]} onClick={toggleLogoutModal}>
          로그아웃
        </button>
      </aside>
    </div>
  );
};
