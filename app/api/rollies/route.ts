import { NextResponse } from "next/server";
import { SbCreatedRollyListItemRepository } from "@/infrastructure/repositories/SbCreatedRollyListItemRepository";
import { DfCreatedRollyListItemUsecase } from "@/application/usecases/rolly/DfCreatedRollyListItemUsecase";
import CreatedRollyListItemDto from "@/application/usecases/rolly/dto/CreatedRollyListItemDto";

export async function GET() {
  const createdRollyListItemRepository = new SbCreatedRollyListItemRepository();
  const createdRollyListItemUsecase = new DfCreatedRollyListItemUsecase(
    createdRollyListItemRepository
  );
  const createdRollyListItemDto: CreatedRollyListItemDto[] =
    await createdRollyListItemUsecase.execute();
  return NextResponse.json(createdRollyListItemDto);
}
