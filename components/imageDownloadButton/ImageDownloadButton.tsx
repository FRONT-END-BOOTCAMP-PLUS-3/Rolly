import React from "react";
import html2canvas from "html2canvas";
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
      const canvas = await html2canvas(targetRef.current);
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "downloaded-image.png"; // 다운로드할 파일명
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <button type="button" className={`$ ${className}`} onClick={handleDownload}>
      <Image
        src="/icons/image-download.svg"
        width={24}
        height={24}
        alt="사진 다운로드"
      />
    </button>
  );
};

export default ImageDownloadButton;
