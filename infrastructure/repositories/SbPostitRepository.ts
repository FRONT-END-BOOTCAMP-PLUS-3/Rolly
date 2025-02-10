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
        .single();
      if (error) throw error;

      return data;
    } catch (error) {
      console.error("Postit 생성 실패:", (error as Error).message);
      throw error;
    }
  }

  async findPostits(rollyId: number): Promise<Postit[]> {
    try {
      const { data, error } = await supabase
        .from("postit")
        .select("*")
        .eq("rolly_id", rollyId);

      if (error) throw error;
      if (!data) throw new Error("Postit들을 가져오지 못했습니다.");

      return data.map(
        ({
          rolly_id: rollyId,
          postit_theme_id: postitThemeId,
          font_family_id: fontFamilyId,
          writer_email: writerEmail,
          created_at: createdAt,
          ...rest
        }) => ({
          rollyId,
          postitThemeId,
          fontFamilyId,
          writerEmail,
          createdAt,
          ...rest,
        })
      );
    } catch (error) {
      console.error("Postit들 가져오기 실패:", (error as Error).message);
      throw error;
    }
  }
}
