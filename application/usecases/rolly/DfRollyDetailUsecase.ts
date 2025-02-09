import { RollyRepository } from "@/domain/repositories/RollyRepository";
import { RollyDetailDto } from "./dto/RollyDetailDto";

export class DfRollyDetailUsecase {
  constructor(private repository: RollyRepository) {}

  async execute(
    rollyId: number,
    rollyThemeList: { name: string }[]
  ): Promise<RollyDetailDto> {
    const rolly = await this.repository.findRolly(rollyId);

    return {
      id: rolly.id,
      typeId: rolly.typeId,
      title: rolly.title,
      image: rolly.image,
      phrase: rolly.phrase,
      backgroundTheme: `${rollyThemeList[rolly.backgroundThemeId - 1]?.name || "default"}`,
    };
  }
}
