import { CreatedRollyListItemRepository } from "@/domain/repositories/CreatedRollyListItemRepository";
import CreatedRollyListItemDto from "./dto/CreatedRollyListItemDto";

export class DfCreatedRollyListItemUsecase {
  private repository: CreatedRollyListItemRepository;

  constructor(repository: CreatedRollyListItemRepository) {
    this.repository = repository;
  }

  async execute(): Promise<CreatedRollyListItemDto[]> {
    const rollyListItems = await this.repository.findRollies();

    const rollyListItemDtos: CreatedRollyListItemDto[] = rollyListItems.map(
      (rollyListItem) => ({
        id: rollyListItem.id,
        typeId: rollyListItem.typeId,
        title: rollyListItem.title,
        isLocked: rollyListItem.isLocked,
        createAt: rollyListItem.createdAt,
      })
    );

    return rollyListItemDtos;
  }
}
