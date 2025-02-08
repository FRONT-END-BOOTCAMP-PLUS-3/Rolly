import { PostitTheme } from "@/domain/entities/PostitTheme";
import { PostitThemeRepository } from "@/domain/repositories/PostitThemeRepository";
import supabase from "@/utils/supabase/supabaseClient";

export class SbPostitThemeRepository implements PostitThemeRepository {
  async getAll(): Promise<PostitTheme[]> {
    try {
      const { data, error } = await supabase
        .from("postit_theme")
        .select("*")
        .order("id");

      if (error) throw error;
      if (!data) throw new Error("postit themes를 가져오지 못했습니다.");

      return data;
    } catch (error) {
      console.error("postit themes 가져오기 실패:", (error as Error).message);
      throw error;
    }
  }
}
