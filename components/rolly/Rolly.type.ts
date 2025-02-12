export type Postit = {
  content: string;
  fontFamily: string;
  postitTheme: string;
};

export type RollyProps = {
  theme: string;
  phrase: string;
  isEditable: boolean;
  previewImgUrl?: string | null;
  imageUrl?: string;
  postits?: Postit[];
  children?: React.ReactNode;
  onPhraseClick?: () => void;
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
