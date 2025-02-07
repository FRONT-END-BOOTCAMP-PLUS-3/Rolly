import { UUID } from "@/types/common";
import { Rolly } from "../entities/Rolly";

export interface RollyRepository {
  createRolly(rolly: Rolly): Promise<number>;
  createdRolly(userId: UUID): Promise<Rolly[]>;
}
