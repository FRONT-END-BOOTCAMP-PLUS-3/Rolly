import { Rolly } from "@/domain/entities/Rolly";
import { CreatedRollyRepository } from "@/domain/repositories/CreatedRollyRepository";
import { UUID } from "@/types/common";
import supabase from "@/utils/supabase/supabaseClient";

export class SbCreatedRollyRepository implements CreatedRollyRepository {
  async findRollies(userId: UUID): Promise<Rolly[]> {
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
