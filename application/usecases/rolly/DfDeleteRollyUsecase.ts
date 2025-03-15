import { RollyRepository } from "@/domain/repositories/RollyRepository";

export class DfDeleteRollyUsecase {
  private repository: RollyRepository;

  constructor(repository: RollyRepository) {
    this.repository = repository;
  }

  async execute(id: number): Promise<void> {
    try {
      await this.repository.deleteRolly(id);
    } catch (error) {
      console.error("롤리 삭제에 실패했습니다", error);
      throw error;
    }
  }
}
