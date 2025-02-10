import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { UUID } from "@/types/common";
import supabase from "@/utils/supabase/supabaseClient";

export class SbUserRepository implements UserRepository {
  async findUserName(userId: UUID): Promise<User> {
    try {
      const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      if (!data) throw new Error("user 정보를 가져오지 못했습니다.");

      return data;
    } catch (error) {
      console.error("user 정보 가져오기 실패:", (error as Error).message);
      throw error;
    }
  }
}
