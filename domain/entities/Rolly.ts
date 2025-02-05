export interface Rolly {
  id: number;
  userId: number;
  typeId: 1 | 2;
  title: string;
  image: string;
  phrase: string;
  backgroundThemeId: number;
  isLocked: boolean;
  link: string;
  accessType: "edit" | "view";
  createdAt: string;
}
