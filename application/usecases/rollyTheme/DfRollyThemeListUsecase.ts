import { RollyThemeRepository } from "@/domain/repositories/RollyThemeRepository";
import { RollyThemeListDto } from "./dto/RollyThemeListDto";

export class DfRollyThemeListUsecase {
  constructor(private repository: RollyThemeRepository) {}

  async execute(): Promise<RollyThemeListDto[]> {
    const rollyThemeList = await this.repository.getAll();

    return rollyThemeList.map((rollyTheme) => ({ name: rollyTheme.name }));
  }
}
