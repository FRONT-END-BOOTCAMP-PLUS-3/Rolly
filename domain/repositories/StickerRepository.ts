import { Sticker } from "../entities/Sticker";

export interface StickerRepository {
  findStickers(rollyId: number): Promise<Sticker[]>;
}
