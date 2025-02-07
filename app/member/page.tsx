"use client";
import { useRouter } from "next/navigation";
import useToggle from "@/hooks/useToggle";
import useRollyCreateStore from "@/application/state/useRollyCreateStore";
import CreateRollyButton from "@/components/createRollyButton/CreateRollyButton";
import Modal from "@/components/modal/Modal";
import { FormData } from "@/components/modal/Modal.type";

const Index = () => {
  const router = useRouter();
  const [isModalOpen, toggleModal] = useToggle(false);
  const { setType, setTitle } = useRollyCreateStore();

  const handleConfirm = (formData?: FormData) => {
    if (formData && formData.modal_radio && formData.modal_text) {
      switch (formData.modal_radio) {
        case "개인용":
          setType(1);
          break;
        case "단체용":
          setType(2);
          break;
        default:
          break;
      }
      setTitle(formData.modal_text);
    }
    router.push("/member/rollies/create");
  };

  return (
    <>
      <CreateRollyButton onClick={toggleModal} />
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
