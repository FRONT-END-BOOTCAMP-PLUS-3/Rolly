import { PostitRepository } from "@/domain/repositories/PostitRepository";
import { WriterEmailDto } from "./dto/WriterEmailDto";

export class DfWriterEmailsUsecase {
  constructor(private repository: PostitRepository) {}
  async execute(rollyId: number): Promise<WriterEmailDto[]> {
    const emails = await this.repository.findWriterEmails(rollyId);

    const emailsDtos: WriterEmailDto[] = emails.map((email) => ({
      writerEmail: email.writerEmail as string,
    }));
    return emailsDtos;
  }
}
