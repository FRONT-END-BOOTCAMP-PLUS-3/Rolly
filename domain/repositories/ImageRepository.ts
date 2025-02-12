export interface ImageRepository {
  uploadImage(file: File): Promise<string | null>;
}
