import styles from "./Loading.module.scss";
import Image from "next/image";

const Loading = () => {
  return (
    <div className={styles["loading"]}>
      <Image
        src="/images/main-bg.png"
        width={390}
        height={320}
        alt="롤리 메인 이미지"
      />
      <Image
        src="/images/mascot.png"
        width={390}
        height={230}
        className={styles["mascot"]}
        alt="롤리 마스코트"
      />
    </div>
  );
};

export default Loading;
