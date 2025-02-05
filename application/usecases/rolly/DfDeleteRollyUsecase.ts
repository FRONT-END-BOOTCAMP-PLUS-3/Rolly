import supabase from "@/utils/supabase/supabaseClient";

export class DfDeleteRollyUsecase {
  async execute(id: number): Promise<void> {
    const { error } = await supabase.from("rolly").delete().eq("id", id);

    if (error) {
      console.error("삭제 실패", error);
    }
  }
}
