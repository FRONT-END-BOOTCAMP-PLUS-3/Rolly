import { PostitRepository } from "@/domain/repositories/PostitRepository";
import { CreatePostitDto } from "./dto/CreatePostitDto";
import { Postit } from "@/domain/entities/Postit";

export class DfCreatePostitUsecase {
  constructor(private repository: PostitRepository) {}

  async execute(postitDto: CreatePostitDto): Promise<number> {
    const postit: Postit = {
      ...postitDto,
      id: 0,
      createdAt: "",
    };

    return await this.repository.createPostit(postit);
  }
}
