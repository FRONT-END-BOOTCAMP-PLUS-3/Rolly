type Postit = {
  content: string;
  fontFamily: string;
  postitTheme: string;
};

type Sticker = {
  stickerStyle: string;
  xPosition: number;
  yPosition: number;
};

export type RollyProps = {
  theme: string;
  phrase: string;
  isEditable: boolean;
  previewImgUrl?: string | null;
  imageUrl?: string;
  postits?: Postit[];
  stickers?: Sticker[];
  children?: React.ReactNode;
  onPhraseClick?: () => void;
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
