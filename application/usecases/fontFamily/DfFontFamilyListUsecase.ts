import { FontFamilyRepository } from "@/domain/repositories/FontFamilyRepository";
import { FontFamilyListDto } from "./dto/FontFamilyListDto";

export class DfFontFamilyListUsecase {
  constructor(private repository: FontFamilyRepository) {}

  async execute(): Promise<FontFamilyListDto[]> {
    const fontFamilyList = await this.repository.getAll();

    return fontFamilyList.map((fontFamily) => ({
      id: fontFamily.id,
      font: fontFamily.font,
      name: fontFamily.name,
    }));
  }
}
