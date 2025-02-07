import { NextResponse } from "next/server";
import { SbCreatedRollyRepository } from "@/infrastructure/repositories/SbCreatedRollyRepository";
import { DfCreatedRollyUsecase } from "@/application/usecases/rolly/DfCreatedRollyUsecase";
import CreatedRollyDto from "@/application/usecases/rolly/dto/CreatedRollyDto";
import { UUID } from "@/types/common";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId"); // 쿼리에서 userId 가져오기
  const createdRollyRepository = new SbCreatedRollyRepository();
  const createdRollyUsecase = new DfCreatedRollyUsecase(createdRollyRepository);
  const createdRollyDto: CreatedRollyDto[] = await createdRollyUsecase.execute(
    userId as UUID
  );
  return NextResponse.json(createdRollyDto);
}
