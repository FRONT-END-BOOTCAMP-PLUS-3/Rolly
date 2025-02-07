import { RollyRepository } from "@/domain/repositories/RollyRepository";
import CreatedRollyDto from "./dto/CreatedRollyDto";
import { UUID } from "@/types/common";

export class DfCreatedRollyUsecase {
  private repository: RollyRepository;

  constructor(repository: RollyRepository) {
    this.repository = repository;
  }

  async execute(userId: UUID): Promise<CreatedRollyDto[]> {
    const createdRollyListItems =
      await this.repository.findCreatedRollies(userId);

    const createdRollyListItemDtos: CreatedRollyDto[] =
      createdRollyListItems.map((createdRollyListItem) => ({
        id: createdRollyListItem.id,
        typeId: createdRollyListItem.typeId,
        title: createdRollyListItem.title,
        isLocked: createdRollyListItem.isLocked,
        createAt: createdRollyListItem.createdAt,
      }));

    return createdRollyListItemDtos;
  }
}
