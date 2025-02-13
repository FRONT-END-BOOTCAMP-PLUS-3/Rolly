import { NextRequest, NextResponse } from "next/server";
import { DfLockRollyUsecase } from "@/application/usecases/rolly/DfLockRollyUsecase";
import { DfDeleteRollyUsecase } from "@/application/usecases/rolly/DfDeleteRollyUsecase";
import { SbRollyRepository } from "@/infrastructure/repositories/SbRollyRepository";
import { DfRollyDetailUsecase } from "@/application/usecases/rolly/DfRollyDetailUsecase";
import { RollyRepository } from "@/domain/repositories/RollyRepository";
import { RollyDetailDto } from "@/application/usecases/rolly/dto/RollyDetailDto";
import { RollyThemeRepository } from "@/domain/repositories/RollyThemeRepository";
import { DfRollyThemeListUsecase } from "@/application/usecases/rollyTheme/DfRollyThemeListUsecase";
import { RollyThemeDto } from "@/application/usecases/rollyTheme/dto/RollyThemeDto";
import { SbRollyThemeRepository } from "@/infrastructure/repositories/SbRollyThemeRepository";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const repository = new SbRollyRepository();
  const lockRollyUsecase = new DfLockRollyUsecase(repository);
  await lockRollyUsecase.execute(Number(id));
  return NextResponse.json(
    { success: true, message: `롤리 ${id} 잠금 완료` },
    { status: 200 }
  );
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // URL에서 id 추출
  const repository = new SbRollyRepository();
  const deleteRollyUsecase = new DfDeleteRollyUsecase(repository);

  await deleteRollyUsecase.execute(Number(id));
  return NextResponse.json(
    { success: true, message: `롤리 ${id} 삭제 완료` },
    { status: 200 }
  );
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const rollyId = Number(id);

    if (isNaN(rollyId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const rollyThemerepository: RollyThemeRepository =
      new SbRollyThemeRepository();
    const rollyThemeListUsecase: DfRollyThemeListUsecase =
      new DfRollyThemeListUsecase(rollyThemerepository);
    const rollyThemeList: RollyThemeDto[] =
      await rollyThemeListUsecase.execute();

    const repository: RollyRepository = new SbRollyRepository();
    const rollyDetailUsecase: DfRollyDetailUsecase = new DfRollyDetailUsecase(
      repository
    );
    const rollyDetailDto: RollyDetailDto = await rollyDetailUsecase.execute(
      rollyId,
      rollyThemeList
    );

    return NextResponse.json(
      { success: true, rollyDetailDto },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
