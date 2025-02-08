import { FontFamily } from "../entities/FontFamily";

export interface FontFamilyRepository {
  getAll(): Promise<FontFamily[]>;
}
