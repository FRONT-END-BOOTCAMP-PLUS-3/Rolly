import { UserRepository } from "@/domain/repositories/UserRepository";
import { UserNameDto } from "./dto/UserNameDto";
import { UUID } from "@/types/common";

export class DfUserNameUsecase {
  constructor(private repository: UserRepository) {}

  async execute(userId: UUID): Promise<UserNameDto> {
    const user = await this.repository.findUserName(userId);

    return { name: user.name };
  }
}
