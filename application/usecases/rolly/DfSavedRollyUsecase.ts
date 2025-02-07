import { RollyRepository } from "@/domain/repositories/RollyRepository";
import { SavedRollyRepository } from "@/domain/repositories/SavedRollyRepository";
import SavedRollyDto from "./dto/SavedRollyDto";

export class DfSavedRollyUsecase {
  private savedRollyRepository: SavedRollyRepository;
  private rollyRepository: RollyRepository;
  constructor(
    savedRollyRepository: SavedRollyRepository,
    rollyRepository: RollyRepository
  ) {
    this.savedRollyRepository = savedRollyRepository;
    this.rollyRepository = rollyRepository;
  }
  async execute(userId: number): Promise<SavedRollyDto[]> {
    // 1. saves 테이블에서 엔티티 조회
    const savedList = await this.savedRollyRepository.getSavedList(userId);
    if (savedList.length === 0) return [];

    // 2. 중복 제거한 rollyId 목록 만들기
    const rollyIds = Array.from(new Set(savedList.map((s) => s.rollyId)));

    // 3. rolly 엔티티 조회
    const rollyList = await this.rollyRepository.getRollyListByIds(rollyIds);

    // 4. saved 엔티티와 rolly 엔티티를 매핑하여 DTO 생성
    const dtos: SavedRollyDto[] = savedList.map((saved) => {
      const rolly = rollyList.find((r) => r.id === saved.rollyId);
      return {
        typeId: rolly ? (rolly.typeId as number) : 0, // 만약 rolly 정보가 없다면 기본값 처리
        title: rolly ? rolly.title : "",
        createdAt: saved.createdAt,
      };
    });

    return dtos;
  }
}
