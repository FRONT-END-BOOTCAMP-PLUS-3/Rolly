import { PostitRepository } from "@/domain/repositories/PostitRepository";
import { PostitDto } from "./dto/PostitDto";

export class DfPostitsUsecase {
  constructor(private repository: PostitRepository) {}

  async execute(
    rollyId: number,
    postitThemeList: { name: string }[],
    fontFamilyList: { name: string; font: string }[]
  ): Promise<PostitDto[]> {
    const postits = await this.repository.findPostits(rollyId);

    return postits.map((postit) => ({
      content: postit.content,
      postitTheme: `/images/postit-theme/${postitThemeList[postit.postitThemeId - 1]?.name + ".svg" || "default.svg"}`,
      fontFamily: fontFamilyList[postit.fontFamilyId - 1].name || "defaultFont",
    }));
  }
}
