import { UUID } from "@/types/common";

export interface CreateRollyDto {
  userId: UUID;
  typeId: 1 | 2;
  title: string;
  image: string;
  phrase: string;
  backgroundThemeId: number;
}
