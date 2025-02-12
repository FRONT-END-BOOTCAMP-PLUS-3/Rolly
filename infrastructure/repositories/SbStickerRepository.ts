import { Sticker } from "@/domain/entities/Sticker";
import { StickerRepository } from "@/domain/repositories/StickerRepository";
import supabase from "@/utils/supabase/supabaseClient";

export class SbStickerRepository implements StickerRepository {
  async findStickers(rollyId: number): Promise<Sticker[]> {
    try {
      const { data, error } = await supabase
        .from("sticker")
        .select("*")
        .eq("rolly_id", rollyId);

      if (error) throw error;
      if (!data) throw new Error("sticker들을 가져오지 못했습니다.");

      return data.map(
        ({
          rolly_id: rollyId,
          sticker_style_id: stickerStyleId,
          x_position: xPosition,
          y_position: yPosition,
          created_at: createdAt,
          ...rest
        }) => ({
          rollyId,
          stickerStyleId,
          xPosition,
          yPosition,
          createdAt,
          ...rest,
        })
      );
    } catch (error) {
      console.error("sticker들 가져오기 실패:", (error as Error).message);
      throw error;
    }
  }
}
