import { NextRequest, NextResponse } from "next/server";
import { SbRollyRepository } from "@/infrastructure/repositories/SbRollyRepository";
import { DfCreateRollyUsecase } from "@/application/usecases/rolly/DfCreateRollyUsecase";
import { CreateRollyDto } from "@/application/usecases/rolly/dto/CreateRollyDto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const newRolly: CreateRollyDto = {
      userId: body.userId,
      typeId: body.typeId,
      title: body.title,
      image: body.image,
      phrase: body.phrase,
      backgroundThemeId: body.backgroundThemeId,
    };

    const repository = new SbRollyRepository();
    const createRollyUseCase = new DfCreateRollyUsecase(repository);
    const rollyId = await createRollyUseCase.execute(newRolly);

    if (!rollyId) {
      return NextResponse.json({ error: "Rolly 생성 실패" }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: rollyId }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
