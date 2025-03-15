import React from "react";
import { toPng } from "html-to-image";
import Image from "next/image";

interface ImageDownloadButtonProps {
  targetRef: React.RefObject<HTMLDivElement | null>; // 다운로드할 대상 div의 참조를 받습니다.
  className?: string;
}

const ImageDownloadButton: React.FC<ImageDownloadButtonProps> = ({
  targetRef,
  className,
}) => {
  const handleDownload = async () => {
    if (targetRef.current) {
      try {
        const dataUrl = await toPng(targetRef.current, {
          cacheBust: true, // 필요에 따라 캐시를 방지합니다.
          // 추가 옵션들은 필요에 따라 설정할 수 있습니다.
        });

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "downloaded-image.png"; // 다운로드할 파일명
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Oops, something went wrong!", error);
      }
    }
  };

  return (
    <button type="button" className={className} onClick={handleDownload}>
      <Image
        src="/icons/image-download.svg"
        width={24}
        height={24}
        alt="Download Image"
      />
    </button>
  );
};

export default ImageDownloadButton;
