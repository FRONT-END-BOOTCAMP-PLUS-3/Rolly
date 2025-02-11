import { RollyRepository } from "@/domain/repositories/RollyRepository";
import { CreatedRollyDto } from "./dto/CreatedRollyDto";
import { UUID } from "@/types/common";

export class DfCreatedRollyUsecase {
  private repository: RollyRepository;

  constructor(repository: RollyRepository) {
    this.repository = repository;
  }

  async execute(userId: UUID): Promise<CreatedRollyDto[]> {
    const createdRollyItems = await this.repository.findCreatedRollies(userId);

    const createdRollyItemDtos: CreatedRollyDto[] = createdRollyItems.map(
      (createdRollyItem) => ({
        id: createdRollyItem.id,
        typeId: createdRollyItem.typeId,
        title: createdRollyItem.title,
        isLocked: createdRollyItem.isLocked,
        createdAt: createdRollyItem.createdAt,
      })
    );

    return createdRollyItemDtos;
  }
}
