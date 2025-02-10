import { UUID } from "@/types/common";
import { User } from "../entities/User";

export interface UserRepository {
  findUserName(userId: UUID): Promise<User>;
}
