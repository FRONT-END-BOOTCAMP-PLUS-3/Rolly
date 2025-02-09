import { Postit } from "../entities/Postit";

export interface PostitRepository {
  findPostits(rollyId: number): Promise<Postit[]>;
}
