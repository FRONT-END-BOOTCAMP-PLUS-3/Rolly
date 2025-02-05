import { Rolly } from "@/domain/entities/Rolly";
import { CreatedRollyListItemRepository } from "@/domain/repositories/CreatedRollyListItemRepository";
import supabase from "@/utils/supabase/supabaseClient";

export class SbCreatedRollyListItemRepository
  implements CreatedRollyListItemRepository
{
  async findRollies(): Promise<Rolly[]> {
    // // 현재 로그인한 사용자 정보 가져오기
    // 아직 로그인 구현 안되어있음
    // const {
    //   data: { user },
    //   error: authError,
    // } = await supabase.auth.getUser();

    // if (authError || !user) {
    //   console.error("Error fetching user:", authError);
    //   return [];
    // }
    // // 로그인한 사용자의 id 가져오기
    // const userId = user.id;

    // 임시 userId
    const userId = String("15911709-59d8-47f5-9448-0c825ee184fb");

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
