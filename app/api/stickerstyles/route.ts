import { SbStickerStyleRepository } from "@/infrastructure/repositories/SbStickerStyleRepository";
import { DfStickerStyleListUsecase } from "@/application/usecases/stickerStyle/DfStickerStyleListUsecase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const repository = new SbStickerStyleRepository();
    const stickerStyleListUsecase = new DfStickerStyleListUsecase(repository);
    const stickerStyleList = await stickerStyleListUsecase.execute();

    if (!stickerStyleList || stickerStyleList.length === 0) {
      return NextResponse.json(
        { error: "sticker style list 가져오기 실패" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: stickerStyleList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching sticker style list:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
