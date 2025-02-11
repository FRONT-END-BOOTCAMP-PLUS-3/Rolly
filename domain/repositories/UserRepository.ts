import { UUID } from "@/types/common";
import { User } from "../entities/User";

export interface UserRepository {
  findUserInfo(userId: UUID): Promise<User>;
}
