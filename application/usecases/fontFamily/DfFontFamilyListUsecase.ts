import { FontFamilyRepository } from "@/domain/repositories/FontFamilyRepository";
import { FontFamilyDto } from "./dto/FontFamilyDto";

export class DfFontFamilyListUsecase {
  constructor(private repository: FontFamilyRepository) {}

  async execute(): Promise<FontFamilyDto[]> {
    const fontFamilyList = await this.repository.getAll();

    return fontFamilyList.map((fontFamily) => ({
      id: fontFamily.id,
      font: fontFamily.font,
      name: fontFamily.name,
    }));
  }
}
