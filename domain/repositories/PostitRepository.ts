import { Postit } from "../entities/Postit";

export interface PostitRepository {
  findPostits(rollyId: number): Promise<Postit[]>;
  createPostit(postit: Postit): Promise<number>;
}
