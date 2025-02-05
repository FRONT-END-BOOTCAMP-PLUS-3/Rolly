import { CreatedRollyRepository } from "@/domain/repositories/CreatedRollyRepository";
import CreatedRollyDto from "./dto/CreatedRollyDto";

export class DfCreatedRollyUsecase {
  private repository: CreatedRollyRepository;

  constructor(repository: CreatedRollyRepository) {
    this.repository = repository;
  }

  async execute(): Promise<CreatedRollyDto[]> {
    const createdRollyListItems = await this.repository.findRollies();

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
