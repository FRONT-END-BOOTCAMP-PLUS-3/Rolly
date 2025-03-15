import { ImageRepository } from "@/domain/repositories/ImageRepository";

export class DfUploadImageUseCase {
  constructor(private repository: ImageRepository) {}

  async execute(file: File): Promise<string | null> {
    return await this.repository.uploadImage(file);
  }
}
