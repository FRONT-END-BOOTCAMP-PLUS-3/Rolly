import styles from "./Rolly.module.scss";
import Image from "next/image";
import { RollyProps } from "./Rolly.type";
import { forwardRef } from "react";

const Rolly = forwardRef<HTMLDivElement, RollyProps>(
  (
    {
      theme,
      phrase,
      isEditable,
      previewImgUrl,
      imageUrl,
      postits = [],
      stickers = [],
      children,
      onFileChange,
      onPhraseClick,
    }: RollyProps,
    ref
  ) => {
    return (
      <div ref={ref} className={`${styles["rolly"]} ${styles[theme]}`}>
        <div className={styles["input-wrapper"]}>
          <svg width="200" height="150" viewBox="0 0 200 200">
            <defs>
              <path
                id="curve"
                d="M 20,100 A 80,80 0 0,1 180,100"
                fill="transparent"
              />
            </defs>
            <text>
              <textPath
                href="#curve"
                textAnchor="middle"
                startOffset="50%"
                className={`${styles["phrase"]} ${!isEditable ? styles["disabled"] : ""} ${styles[theme]}`}
                onClick={isEditable ? onPhraseClick : undefined}
              >
                {phrase}
              </textPath>
            </text>
          </svg>
          <div className={styles["img-wrapper"]}>
            {isEditable ? (
              <label className={styles["input-file-label"]} role="button">
                <input
                  type="file"
                  className={styles["input-file"]}
                  accept="image/*"
                  onChange={onFileChange}
                />
                {previewImgUrl ? (
                  <Image
                    src={previewImgUrl}
                    width={100}
                    height={100}
                    alt="업로드한 이미지 미리보기"
                  />
                ) : (
                  <Image
                    src="/icons/image-upload.svg"
                    width={24}
                    height={24}
                    alt="업로드한 이미지 미리보기"
                  />
                )}
              </label>
            ) : (
              <Image
                src={imageUrl || "default.svg"}
                width={100}
                height={100}
                className={styles["img"]}
                alt="업로드한 이미지"
              />
            )}
          </div>
        </div>
        <div className={styles["postit-container"]}>
          {postits.map((postit, index) => (
            <div
              key={index}
              className={`${styles["postit"]} ${postit.fontFamily}`}
            >
              <Image
                src={postit.postitTheme}
                width={100}
                height={100}
                className={styles["postit-img"]}
                alt={`포스트잇 ${postit.postitTheme} 테마`}
              />
              <p>{postit.content}</p>
            </div>
          ))}
        </div>
        {stickers.map((sticker, index) => (
          <Image
            src={sticker.stickerStyle}
            key={index}
            width={50}
            height={50}
            alt={`스티커 ${sticker.stickerStyle}`}
            style={{
              position: "absolute",
              top: `${sticker.yPosition}px`,
              left: `${sticker.xPosition}%`,
              zIndex: 998,
            }}
          />
        ))}
        {children}
      </div>
    );
  }
);

Rolly.displayName = "Rolly";

export default Rolly;
