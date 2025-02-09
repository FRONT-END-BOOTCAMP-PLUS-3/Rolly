import { Postit } from "@/domain/entities/Postit";
import { PostitRepository } from "@/domain/repositories/PostitRepository";
import supabase from "@/utils/supabase/supabaseClient";

export class SbPostitRepository implements PostitRepository {
  async createPostit(postit: Postit): Promise<number> {
    try {
      const { data, error } = await supabase
        .from("postit")
        .insert([
          {
            rolly_id: postit.rollyId,
            content: postit.content,
            writer_email: postit.writerEmail || null,
            postit_theme_id: postit.postitThemeId,
            font_family_id: postit.fontFamilyId,
          },
        ])
        .select("id")
        .single();
      if (error) throw error;
      if (!data || !data.id) throw new Error("ID를 가져오지 못했습니다.");

      return data.id;
    } catch (error) {
      console.error("Postit 생성 실패:", (error as Error).message);
      throw error;
    }
  }
}
