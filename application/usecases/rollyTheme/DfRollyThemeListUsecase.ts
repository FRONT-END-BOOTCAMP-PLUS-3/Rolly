import { RollyThemeRepository } from "@/domain/repositories/RollyThemeRepository";
import { RollyThemeDto } from "./dto/RollyThemeDto";

export class DfRollyThemeListUsecase {
  constructor(private repository: RollyThemeRepository) {}

  async execute(): Promise<RollyThemeDto[]> {
    const rollyThemeList = await this.repository.getAll();

    return rollyThemeList.map((rollyTheme) => ({
      id: rollyTheme.id,
      name: rollyTheme.name,
    }));
  }
}
