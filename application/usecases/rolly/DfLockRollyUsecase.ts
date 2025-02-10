import { RollyRepository } from "@/domain/repositories/RollyRepository";

export class DfLockRollyUsecase {
  private repository: RollyRepository;

  constructor(repository: RollyRepository) {
    this.repository = repository;
  }

  async execute(id: number): Promise<void> {
    try {
      await this.repository.lockRolly(id);
    } catch (error) {
      console.error("롤리 잠금에 실패했습니다", error);
      throw error;
    }
  }
}
