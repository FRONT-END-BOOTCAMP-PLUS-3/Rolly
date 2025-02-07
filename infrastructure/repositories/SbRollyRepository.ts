import supabase from "@/utils/supabase/supabaseClient";
import { Rolly } from "@/domain/entities/Rolly";
import { RollyRepository } from "@/domain/repositories/RollyRepository";
import { UUID } from "@/types/common";

export class SbRollyRepository implements RollyRepository {
  async createRolly(rolly: Rolly): Promise<number> {
    try {
      const { data, error } = await supabase
        .from("rolly")
        .insert([
          {
            user_id: rolly.userId,
            type_id: rolly.typeId,
            title: rolly.title,
            image: rolly.image,
            phrase: rolly.phrase,
            background_theme_id: rolly.backgroundThemeId,
          },
        ])
        .select("id")
        .single();

      if (error) throw error;
      if (!data || !data.id) throw new Error("ID를 가져오지 못했습니다.");

      return data.id;
    } catch (error) {
      console.error("Rolly 생성 실패:", (error as Error).message);
      throw error;
    }
  }
  async createdRolly(userId: UUID): Promise<Rolly[]> {
    // 저장한 user id를 불러와서 쿼리에 사용
    const { data, error } = await supabase
      .from("rolly")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching rolly list:", error);
      return [];
    }

    return (
      data.map(
        ({
          user_id: userId,
          type_id: typeId,
          is_locked: isLocked,
          created_at: createdAt,
          ...rest
        }) => ({
          userId,
          typeId,
          isLocked,
          createdAt,
          ...rest,
        })
      ) || null
    );
  }
}
