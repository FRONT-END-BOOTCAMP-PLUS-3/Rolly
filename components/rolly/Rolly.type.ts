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
  onPhraseClick?: () => void;
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
