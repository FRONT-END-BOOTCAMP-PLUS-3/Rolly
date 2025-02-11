import { UserRepository } from "@/domain/repositories/UserRepository";
import { UserInfoDto } from "./dto/UserInfoDto";
import { UUID } from "@/types/common";

export class DfUserInfoUsecase {
  constructor(private repository: UserRepository) {}

  async execute(userId: UUID): Promise<UserInfoDto> {
    const userInfo = await this.repository.findUserInfo(userId);

    return { id: userInfo.id, email: userInfo.email, name: userInfo.name };
  }
}
