import supabase from "@/utils/supabase/supabaseClient";

export class DfLockRollyUsecase {
  async execute(id: number): Promise<void> {
    const { data, error } = await supabase
      .from("rolly")
      .select("is_locked")
      .eq("id", id)
      .single();

    if (error) {
      console.log("잠금 상태 불러오기 실패", error);
    }

    const isLocked = data?.is_locked;
    if (!isLocked) {
      //supabse 업데이트
      const { error: updateError } = await supabase
        .from("rolly")
        .update({ is_locked: true })
        .eq("id", id);

      if (updateError) {
        console.error("잠금 상태 업데이트 실패:", updateError);
      }
    }
  }
}
