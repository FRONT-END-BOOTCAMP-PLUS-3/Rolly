import supabase from "@/utils/supabase/supabaseClient";

export class DfGetUserUsecase {
  async execute(): Promise<string | null> {
    try {
      const { data, error } = await supabase.auth.getUser();

      const userId = data?.user?.id ?? null;

      if (error) throw error;
      if (!userId) throw new Error("ID를 가져오지 못했습니다.");

      return userId;
    } catch (error) {
      console.error("인증 실패:", (error as Error).message);
      return null;
    }
  }
}
