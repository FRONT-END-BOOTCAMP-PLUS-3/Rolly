import { RollyTheme } from "../entities/RollyTheme";

export interface RollyThemeRepository {
  getAll(): Promise<RollyTheme[]>;
}
