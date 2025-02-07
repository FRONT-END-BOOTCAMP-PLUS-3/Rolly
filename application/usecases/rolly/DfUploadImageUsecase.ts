import supabase from "@/utils/supabase/supabaseClient";

export class DfUploadImageUsecase {
  private bucketName = "user-images";

  async execute(file: File): Promise<string | null> {
    const fileName = `${Date.now()}-${file.name}`;

    try {
      const { error } = await supabase.storage
        .from(this.bucketName)
        .upload(fileName, file);

      if (error) throw error;

      // 이미지 업로드 성공 후 이미지 URL 가져오기
      return await this.getImageUrl(fileName);
    } catch (error) {
      console.error("이미지 업로드 실패:", (error as Error).message);
      return null;
    }
  }

  private async getImageUrl(fileName: string): Promise<string | null> {
    const { data } = await supabase.storage
      .from(this.bucketName)
      .getPublicUrl(fileName);

    return data?.publicUrl ?? null;
  }
}
