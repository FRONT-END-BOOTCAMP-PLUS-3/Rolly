import { UUID } from "@/types/common";
import { Rolly } from "../entities/Rolly";

export interface RollyRepository {
  createRolly(rolly: Rolly): Promise<number>;
  findCreatedRollies(userId: UUID): Promise<Rolly[]>;
  getRollyListByIds(ids: number[]): Promise<Rolly[]>;
}
