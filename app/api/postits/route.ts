import { NextRequest, NextResponse } from "next/server";
import { SbPostitRepository } from "@/infrastructure/repositories/SbPostitRepository";
import { DfCreatePostitUsecase } from "@/application/usecases/postit/DfCreatePostitUsecase";
import { CreatePostitDto } from "@/application/usecases/postit/dto/CreatePostitDto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const newPostit: CreatePostitDto = {
      rollyId: body.rollyId,
      content: body.content,
      writerEmail: body.writerEmail,
      postitThemeId: body.postitThemeId,
      fontFamilyId: body.fontFamilyId,
    };

    const repository = new SbPostitRepository();
    const createPostitUseCase = new DfCreatePostitUsecase(repository);
    const postitId = await createPostitUseCase.execute(newPostit);

    if (!postitId) {
      return NextResponse.json({ error: "postit 생성 실패" }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: postitId }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
