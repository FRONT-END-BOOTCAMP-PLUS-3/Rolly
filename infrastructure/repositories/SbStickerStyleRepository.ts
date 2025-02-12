import { StickerStyle } from "@/domain/entities/StickerStyle";
import { StickerStyleRepository } from "@/domain/repositories/StickerStyleRepository";
import supabase from "@/utils/supabase/supabaseClient";

export class SbStickerStyleRepository implements StickerStyleRepository {
  async getAll(): Promise<StickerStyle[]> {
    try {
      const { data, error } = await supabase
        .from("sticker_style")
        .select("*")
        .order("id");

      if (error) throw error;
      if (!data) throw new Error("sticker style를 가져오지 못했습니다.");
      return data;
    } catch (error) {
      console.error("sticker style 가져오기 실패:", (error as Error).message);
      throw error;
    }
  }
}
