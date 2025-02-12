import { StickerRepository } from "@/domain/repositories/StickerRepository";
import { StickerDto } from "./dto/StickerDto";

export class DfStickersUsecase {
  constructor(private repository: StickerRepository) {}

  async execute(
    rollyId: number,
    stickerStyleList: { id: number; name: string }[]
  ): Promise<StickerDto[]> {
    const stickers = await this.repository.findStickers(rollyId);

    return stickers.map((sticker) => ({
      stickerStyle: `/images/sticker/${stickerStyleList[sticker.stickerStyleId - 1]?.name + ".svg" || "default.svg"}`,
      xPosition: sticker.xPosition,
      yPosition: sticker.yPosition,
    }));
  }
}
