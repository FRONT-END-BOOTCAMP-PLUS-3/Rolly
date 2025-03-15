import { PostitThemeRepository } from "@/domain/repositories/PostitThemeRepository";
import { PostitThemeDto } from "./dto/PostitThemeDto";

export class DfPostitThemeListUsecase {
  constructor(private repository: PostitThemeRepository) {}

  async execute(): Promise<PostitThemeDto[]> {
    const postitThemeList = await this.repository.getAll();

    return postitThemeList.map((postitTheme) => ({
      id: postitTheme.id,
      name: postitTheme.name,
    }));
  }
}
