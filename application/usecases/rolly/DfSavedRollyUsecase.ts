import { SavedRollyDto } from "./dto/SavedRollyDto";
import { UUID } from "@/types/common";
import { SbRollyRepository } from "@/infrastructure/repositories/SbRollyRepository";
import { SbSavedRollyRepository } from "@/infrastructure/repositories/SbSavedRollyRepository";

export class DfSavedRollyUsecase {
  constructor(
    private savedRollyRepository: SbSavedRollyRepository,
    private rollyRepository: SbRollyRepository
  ) {}
  async execute(userId: UUID): Promise<SavedRollyDto[]> {
    // 1. userId로 saves 테이블에서 rollyId 가져오기
    const savedRollies =
      await this.savedRollyRepository.findSavedRollyIds(userId);
    const rollyIds = savedRollies.map((saved) => saved.rollyId);

    if (rollyIds.length === 0) return [];

    // 2. rolly 테이블에서 rolly 정보 가져오기
    const rollies = await this.rollyRepository.findSavedRollies(rollyIds);

    // 3. DTO 변환 후 반환
    return rollies.map((rolly) => ({
      id: rolly.id,
      typeId: rolly.typeId,
      title: rolly.title,
      createdAt: rolly.createdAt,
    }));
  }
}
