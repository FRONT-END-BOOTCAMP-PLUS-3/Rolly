import { DfStickersUsecase } from "@/application/usecases/sticker/DfStickersUsecase";
import { StickerDto } from "@/application/usecases/sticker/dto/StickerDto";
import { DfStickerStyleListUsecase } from "@/application/usecases/stickerStyle/DfStickerStyleListUsecase";
import { StickerStyleDto } from "@/application/usecases/stickerStyle/dto/StickerStyleDto";
import { StickerRepository } from "@/domain/repositories/StickerRepository";
import { StickerStyleRepository } from "@/domain/repositories/StickerStyleRepository";
import { SbStickerRepository } from "@/infrastructure/repositories/SbStickerRepository";
import { SbStickerStyleRepository } from "@/infrastructure/repositories/SbStickerStyleRepository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const rollyId = Number(url.searchParams.get("rollyId"));

    if (isNaN(rollyId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const stickerStyleRepository: StickerStyleRepository =
      new SbStickerStyleRepository();
    const stickerStyleListUsecase: DfStickerStyleListUsecase =
      new DfStickerStyleListUsecase(stickerStyleRepository);
    const stickerStyleList: StickerStyleDto[] =
      await stickerStyleListUsecase.execute();

    if (!stickerStyleList) {
      throw new Error("stickerStyleList가 없습니다.");
    }

    const repository: StickerRepository = new SbStickerRepository();
    const sitckersUsecase: DfStickersUsecase = new DfStickersUsecase(
      repository
    );
    const stickersDto: StickerDto[] = await sitckersUsecase.execute(
      rollyId,
      stickerStyleList
    );

    return NextResponse.json({ success: true, stickersDto }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
