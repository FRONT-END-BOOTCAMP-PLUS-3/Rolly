import { FontFamily } from "@/domain/entities/FontFamily";
import { FontFamilyRepository } from "@/domain/repositories/FontFamilyRepository";
import supabase from "@/utils/supabase/supabaseClient";

export class SbFontFamilyRepository implements FontFamilyRepository {
  async getAll(): Promise<FontFamily[]> {
    try {
      const { data, error } = await supabase
        .from("font_family")
        .select("*")
        .order("id");

      if (error) throw error;
      if (!data) throw new Error("font families를 가져오지 못했습니다.");

      return data;
    } catch (error) {
      console.error("font families 가져오기 실패:", (error as Error).message);
      throw error;
    }
  }
}
