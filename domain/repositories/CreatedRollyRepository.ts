import { Rolly } from "@/domain/entities/Rolly";
import { UUID } from "@/types/common";

export interface CreatedRollyRepository {
  findRollies(userId: UUID): Promise<Rolly[]>;
}
