import { Rolly } from "@/domain/entities/Rolly";

export interface CreatedRollyListItemRepository {
  findRollies(): Promise<Rolly[]>;
}
