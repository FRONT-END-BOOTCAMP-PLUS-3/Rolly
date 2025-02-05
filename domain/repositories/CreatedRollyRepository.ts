import { Rolly } from "@/domain/entities/Rolly";

export interface CreatedRollyRepository {
  findRollies(): Promise<Rolly[]>;
}
