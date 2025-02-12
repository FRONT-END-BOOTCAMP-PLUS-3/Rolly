import { StickerStyle } from "../entities/StickerStyle";

export interface StickerStyleRepository {
  getAll(): Promise<StickerStyle[]>;
}
