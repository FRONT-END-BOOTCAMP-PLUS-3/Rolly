import { RollyRepository } from "@/domain/repositories/RollyRepository";
import { CreateRollyDto } from "./dto/CreateRollyDto";
import { Rolly } from "@/domain/entities/Rolly";

export class DfCreateRollyUsecase {
  constructor(private repository: RollyRepository) {}

  async execute(rollyDto: CreateRollyDto): Promise<number> {
    const rolly: Rolly = {
      ...rollyDto,
      id: 0,
      isLocked: false,
      createdAt: "",
    };

    return await this.repository.createRolly(rolly);
  }
}
