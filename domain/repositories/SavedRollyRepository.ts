// import { Rolly } from "../entities/Rolly";

// export interface SavedRollyRepository {
//   getRollyListByIds(ids: number[]): Promise<Rolly[]>;
// }
import { Saved } from "../entities/Saved";

export interface SavedRollyRepository {
  getSavedList(userId: number): Promise<Saved[]>;
}
