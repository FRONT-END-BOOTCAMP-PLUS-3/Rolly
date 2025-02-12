"use client";

interface ImageDownloadButton {
  onClick?: () => void;
  className?: string;
}

const ImageDownloadButton: React.FC<ImageDownloadButton> = ({
  onClick,
  className,
}) => {
  return (
    <button type="button" className={`$ ${className}`} onClick={onClick}>
      <img src="/icons/image-download.svg" alt="사진 다운로드" />
    </button>
  );
};

export default ImageDownloadButton;
