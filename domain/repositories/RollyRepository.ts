import { UUID } from "@/types/common";
import { Rolly } from "../entities/Rolly";

export interface RollyRepository {
  createRolly(rolly: Rolly): Promise<number>;
  findCreatedRollies(userId: UUID): Promise<Rolly[]>;
  findSavedRollies(ids: number[]): Promise<Rolly[]>;
  findRolly(rollyId: number): Promise<Rolly>;
  lockRolly(rollyId: number): Promise<void>;
  deleteRolly(rollyId: number): Promise<void>;
}
