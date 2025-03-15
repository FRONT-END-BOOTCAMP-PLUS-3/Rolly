import styles from "./Modal.module.scss";
import { ModalContent } from "./Modal.type";

type ModalnInputProps = {
  content: ModalContent;
  onChange: (name: string, value: string) => void;
};

const ModalInput = ({ content, onChange }: ModalnInputProps) => {
  if (!("input" in content)) {
    return null; // input이 없는 경우 아무것도 렌더링하지 않음
  }

  if (content.input === "text") {
    return (
      <input
        type="text"
        name="modal_text"
        maxLength={content.maxLength}
        onChange={(e) => onChange(e.target.name, e.target.value)}
      />
    );
  }

  if (content.input === "radio" && content.radioOptions) {
    return (
      <div className={styles["radio-wrapper"]}>
        {content.radioOptions.map((option, idx) => (
          <label key={idx}>
            <input
              type="radio"
              name="modal_radio"
              value={option}
              onChange={(e) => onChange(e.target.name, e.target.value)}
            />
            {option}
          </label>
        ))}
      </div>
    );
  }

  return null;
};

export default ModalInput;
