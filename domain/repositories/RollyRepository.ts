import { Rolly } from "../entities/Rolly";

export interface RollyRepository {
  createRolly(rolly: Rolly): Promise<number>;
}
