import { Rolly } from "@/domain/entities/Rolly";
import { RollyRepository } from "@/domain/repositories/RollyRepository";
import supabase from "@/utils/supabase/supabaseClient";

export class SbRollyRepository implements RollyRepository {
  async getRollyListByIds(ids: number[]): Promise<Rolly[]> {
    // 2. rolly 테이블에서 해당 rolly_id들의 title, type_id 가져오기
    if (ids.length === 0) return [];

    const { data, error } = await supabase
      .from("rolly")
      .select("*")
      .in("id", ids);

    if (error) {
      console.error("Error fetching rolly data:", error);
      return [];
    }

    return data.map(
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
    );
  }
}
