import React from "react";
import styles from "./AuthInput.module.scss";

type AuthInputProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

const AuthInput: React.FC<AuthInputProps> = ({
  label,
  placeholder = "",
  value,
  onChange,
  type = "text",
}) => {
  return (
    <div className={styles["input-field"]}>
      <label className={styles["input-label"]}>{label}</label>
      <input
        type={type}
        className={styles["input-element"]}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default AuthInput;
