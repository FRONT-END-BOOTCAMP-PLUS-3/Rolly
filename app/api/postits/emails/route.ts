import { DfWriterEmailsUsecase } from "@/application/usecases/postit/DfWriterEmailsUsecase";
import { WriterEmailDto } from "@/application/usecases/postit/dto/WriterEmailDto";
import { PostitRepository } from "@/domain/repositories/PostitRepository";
import { SbPostitRepository } from "@/infrastructure/repositories/SbPostitRepository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const rollyId = Number(url.searchParams.get("rollyId"));

    if (isNaN(rollyId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const postitReository: PostitRepository = new SbPostitRepository();
    const writerEmailUsecase: DfWriterEmailsUsecase = new DfWriterEmailsUsecase(
      postitReository
    );
    const writerEmailDto: WriterEmailDto[] =
      await writerEmailUsecase.execute(rollyId);

    return NextResponse.json(
      { success: true, writerEmailDto },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
