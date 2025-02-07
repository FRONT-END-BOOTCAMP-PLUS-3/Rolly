import { UUID } from "@/types/common";
import { Saves } from "../entities/Saves";

export interface SavedRollyRepository {
  findSavedRollyIds(userId: UUID): Promise<Saves[]>;
}
