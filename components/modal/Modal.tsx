import { useCallback, useEffect, useState } from "react";
import styles from "./Modal.module.scss";
import { InputFormData, ModalProps } from "./Modal.type";
import ModalInput from "./ModalInput";

const Modal = ({
  contents,
  confirmText = "완료",
  cancelText = "취소",
  onConfirm,
  onCancel,
  isOpen,
}: ModalProps) => {
  const [inputFormData, setInputFormData] = useState<InputFormData>({});
  const [isValid, setIsValid] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setInputFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setInputFormData({});
    setIsValid(false);
    onCancel();
  };

  // 폼 유효성 검사
  const validateForm = useCallback(
    (data: InputFormData) => {
      let valid = true;

      contents.forEach((content) => {
        if (!("input" in content)) return; // input이 없는 경우는 스킵

        const name = `modal_${content.input}`;

        if (content.input === "text") {
          const textValue = data[name] || "";
          if (!textValue.trim()) valid = false; // 공백 입력 방지
        }

        if (content.input === "radio") {
          if (!data[name]) valid = false; // 라디오 버튼은 값이 반드시 필요
        }
      });

      return valid;
    },
    [contents]
  );

  // inputFormData 변경 시 유효성 검사 실행
  useEffect(() => {
    setIsValid(validateForm(inputFormData));
  }, [inputFormData, validateForm]);

  if (!isOpen) return null; // isOpen이 false면 모달을 렌더링하지 않음

  return (
    <div className={styles["modal-container"]} onClick={handleClose}>
      <div className={styles["modal"]} onClick={(e) => e.stopPropagation()}>
        {contents.map((content, idx) => (
          <div key={idx}>
            <h2>{content.title}</h2>
            {content.body && <p>{content.body}</p>}
            <ModalInput content={content} onChange={handleInputChange} />
          </div>
        ))}
        <div className={styles["actions"]}>
          <button
            type="button"
            className={styles["cancel-btn"]}
            onClick={handleClose}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={styles["confirm-btn"]}
            onClick={() => {
              onConfirm(inputFormData);
            }}
            disabled={!isValid} // 유효하지 않은 경우 버튼 비활성화
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

// usage
/* <Modal
    contents={[
      {
        title: "메시지를 저장하시겠어요?",
        body: "저장 후에는 내용을 수정할 수 없어요!",
      }
    ]}
    onConfirm={() => toggleModal()}
    onCancel={toggleModal}
    isOpen={isModalOpen}
  /> */
/* <Modal
    contents={[
      {
        title: "로그인하시겠어요?",
        body: "로그인이 필요한 서비스입니다!",
      }
    ]}
    onConfirm={() => toggleModal()}
    onCancel={toggleModal}
    isOpen={isModalOpen}
    confirmText="네"
    cancelText="아니오"
  /> */
/* <Modal
    contents={[
      {
        title: "롤리의 타입을 선택해주세요.",
        body: "개인용은 받는 사람이 답장할 수 있어요!",
        input: "radio",
        radioOptions: ["개인용", "단체용"],
      },
      {
        title: "롤리의 이름을 작성해주세요.",
        body: "최대 12자까지 가능해요!",
        input: "text",
        maxLength: 12,
      },
    ]}
    onConfirm={() => toggleModal()}
    onCancel={toggleModal}
    isOpen={isModalOpen}
  /> */
