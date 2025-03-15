import { RollyTheme } from "@/domain/entities/RollyTheme";
import { RollyThemeRepository } from "@/domain/repositories/RollyThemeRepository";
import supabase from "@/utils/supabase/supabaseClient";

export class SbRollyThemeRepository implements RollyThemeRepository {
  async getAll(): Promise<RollyTheme[]> {
    try {
      const { data, error } = await supabase
        .from("rolly_theme")
        .select("*")
        .order("id");

      if (error) throw error;
      if (!data) throw new Error("rolly themes를 가져오지 못했습니다.");

      return data;
    } catch (error) {
      console.error("rolly themes 가져오기 실패:", (error as Error).message);
      throw error;
    }
  }
}
