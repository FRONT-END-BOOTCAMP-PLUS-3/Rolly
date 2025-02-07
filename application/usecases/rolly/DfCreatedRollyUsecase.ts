import { CreatedRollyRepository } from "@/domain/repositories/CreatedRollyRepository";
import CreatedRollyDto from "./dto/CreatedRollyDto";
import { UUID } from "@/types/common";

export class DfCreatedRollyUsecase {
  private repository: CreatedRollyRepository;

  constructor(repository: CreatedRollyRepository) {
    this.repository = repository;
  }

  async execute(userId: UUID): Promise<CreatedRollyDto[]> {
    const createdRollyListItems = await this.repository.findRollies(userId);

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
