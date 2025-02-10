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

  async findCreatedRollies(userId: UUID): Promise<Rolly[]> {
    try {
      // 저장한 user id를 불러와서 쿼리에 사용
      const { data, error } = await supabase
        .from("rolly")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(`Error fetching rolly list: ${error.message}`);
      }

      return (
        data?.map(
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
        ) || []
      );
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  async findSavedRollies(ids: number[]): Promise<Rolly[]> {
    // 2. rolly 테이블에서 해당 rolly_id들의 title, type_id 가져오기
    if (ids.length === 0) return [];

    const { data, error } = await supabase
      .from("rolly")
      .select("*")
      .in("id", ids)
      .order("created_at", { ascending: false });

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

  async findRolly(rollyId: number): Promise<Rolly> {
    try {
      const { data, error } = await supabase
        .from("rolly")
        .select("*")
        .eq("id", rollyId)
        .single();

      if (error) throw error;
      if (!data) throw new Error("Rolly를 가져오지 못했습니다.");

      const {
        user_id: userId,
        type_id: typeId,
        background_theme_id: backgroundThemeId,
        is_locked: isLocked,
        created_at: createdAt,
        ...rest
      } = data;

      return {
        userId,
        typeId,
        backgroundThemeId,
        isLocked,
        createdAt,
        ...rest,
      };
    } catch (error) {
      console.error("Rolly 가져오기 실패:", (error as Error).message);
      throw error;
    }
  }
}
