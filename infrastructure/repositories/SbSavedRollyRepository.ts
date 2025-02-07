import { Saved } from "@/domain/entities/Saved";
import { SavedRollyRepository } from "@/domain/repositories/SavedRollyRepository";
import supabase from "@/utils/supabase/supabaseClient";

export class SbSavedRollyRepository implements SavedRollyRepository {
  async getSavedList(userId: number): Promise<Saved[]> {
    // 1. saves 테이블에서 user_id와 일치하는 목록 가져오기
    const { data, error } = await supabase
      .from("saves")
      .select("rolly_id, user_id, created_at")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching saves:", error);
      return [];
    }

    return data.map((item) => ({
      rollyId: item.rolly_id,
      userId: item.user_id,
      createdAt: item.created_at,
    }));
  }
}
