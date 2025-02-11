import { DfUploadImageUseCase } from "@/application/usecases/rolly/DfUploadImageUsecase";
import { ImageRepository } from "@/domain/repositories/ImageRepository";
import { SbImageRepository } from "@/infrastructure/repositories/SbImageRepository";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 });
    }

    const repository: ImageRepository = new SbImageRepository();
    const uploadImageUseCase: DfUploadImageUseCase = new DfUploadImageUseCase(
      repository
    );
    const imageUrl = await uploadImageUseCase.execute(file);

    return NextResponse.json({ success: true, imageUrl }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
