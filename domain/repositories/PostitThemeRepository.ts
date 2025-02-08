import { PostitTheme } from "../entities/PostitTheme";

export interface PostitThemeRepository {
  getAll(): Promise<PostitTheme[]>;
}
