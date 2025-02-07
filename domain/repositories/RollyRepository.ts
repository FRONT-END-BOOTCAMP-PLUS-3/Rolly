import { Rolly } from "../entities/Rolly";

export interface RollyRepository {
  getRollyListByIds(ids: number[]): Promise<Rolly[]>;
}
