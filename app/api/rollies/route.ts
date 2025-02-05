import { NextResponse } from "next/server";
import { SbCreatedRollyRepository } from "@/infrastructure/repositories/SbCreatedRollyRepository";
import { DfCreatedRollyUsecase } from "@/application/usecases/rolly/DfCreatedRollyUsecase";
import CreatedRollyDto from "@/application/usecases/rolly/dto/CreatedRollyDto";

export async function GET() {
  const createdRollyRepository = new SbCreatedRollyRepository();
  const createdRollyUsecase = new DfCreatedRollyUsecase(createdRollyRepository);
  const createdRollyDto: CreatedRollyDto[] =
    await createdRollyUsecase.execute();
  return NextResponse.json(createdRollyDto);
}
