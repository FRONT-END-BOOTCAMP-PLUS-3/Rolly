import { PostitTheme } from "./PostitTheme";
// import { Rolly } from "./Rolly";
import { FontFamily } from "./FontFamily";
export interface Postit {
  id: number;
  // rollyId: Rolly;
  postitThemeId: PostitTheme;
  writerEmail: string;
  content: string;
  fontFamilyId: FontFamily;
  createdAt: Date;
}
