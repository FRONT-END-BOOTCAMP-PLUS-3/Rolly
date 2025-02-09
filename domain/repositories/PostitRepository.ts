import { Postit } from "../entities/Postit";

export interface PostitRepository {
  createPostit(postit: Postit): Promise<number>;
}
