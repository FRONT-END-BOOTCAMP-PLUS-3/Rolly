import { UUID } from "@/types/common";

export interface Rolly {
  id: number;
  userId: UUID;
  typeId: 1 | 2;
  title: string;
  image: string;
  phrase: string;
  backgroundThemeId: number;
  isLocked: boolean;
  createdAt: string;
}
