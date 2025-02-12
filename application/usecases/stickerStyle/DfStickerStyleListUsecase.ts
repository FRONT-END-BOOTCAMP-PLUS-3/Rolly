import { StickerStyleRepository } from "@/domain/repositories/StickerStyleRepository";
import { StickerStyleDto } from "./dto/StickerStyleDto";

export class DfStickerStyleListUsecase {
  constructor(private repository: StickerStyleRepository) {}

  async execute(): Promise<StickerStyleDto[]> {
    const stickerStyleList = await this.repository.getAll();

    return stickerStyleList.map((stickerStyle) => ({
      id: stickerStyle.id,
      name: stickerStyle.name,
    }));
  }
}
