import { PostitThemeRepository } from "@/domain/repositories/PostitThemeRepository";
import { PostitThemeListDto } from "./dto/PostitThemeListDto";

export class DfPostitThemeListUsecase {
  constructor(private repository: PostitThemeRepository) {}

  async execute(): Promise<PostitThemeListDto[]> {
    const postitThemeList = await this.repository.getAll();

    return postitThemeList.map((postitTheme) => ({
      id: postitTheme.id,
      name: postitTheme.name,
    }));
  }
}
