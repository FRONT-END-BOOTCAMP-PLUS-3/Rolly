import { SbPostitThemeRepository } from "@/infrastructure/repositories/SbPostitThemeRepository";
import { DfPostitThemeListUsecase } from "@/application/usecases/postitTheme/DfPostitThemeListUsecase";
import { PostitThemeRepository } from "@/domain/repositories/PostitThemeRepository";
import { PostitThemeDto } from "@/application/usecases/postitTheme/dto/PostitThemeDto";
import { SbFontFamilyRepository } from "@/infrastructure/repositories/SbFontFamilyRepository";
import { DfFontFamilyListUsecase } from "@/application/usecases/fontFamily/DfFontFamilyListUsecase";
import { FontFamilyRepository } from "@/domain/repositories/FontFamilyRepository";
import { FontFamilyDto } from "@/application/usecases/fontFamily/dto/FontFamilyDto";
import { SbPostitRepository } from "@/infrastructure/repositories/SbPostitRepository";
import { DfPostitsUsecase } from "@/application/usecases/postit/DfPostitsUsecase";
import { PostitRepository } from "@/domain/repositories/PostitRepository";
import { PostitDto } from "@/application/usecases/postit/dto/PostitDto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const rollyId = Number(url.searchParams.get("rollyId"));

    if (isNaN(rollyId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const postitThemerepository: PostitThemeRepository =
      new SbPostitThemeRepository();
    const postitThemeListUsecase: DfPostitThemeListUsecase =
      new DfPostitThemeListUsecase(postitThemerepository);

    const fontFamilyrepository: FontFamilyRepository =
      new SbFontFamilyRepository();
    const fontFamilyListUsecase: DfFontFamilyListUsecase =
      new DfFontFamilyListUsecase(fontFamilyrepository);

    const [postitThemeList, fontFamilyList]: [
      PostitThemeDto[],
      FontFamilyDto[],
    ] = await Promise.all([
      postitThemeListUsecase.execute(),
      fontFamilyListUsecase.execute(),
    ]);

    if (!postitThemeList || !fontFamilyList) {
      throw new Error("PostitThemeList 또는 FontFamilyList가 없습니다.");
    }

    const repository: PostitRepository = new SbPostitRepository();
    const postitsUsecase: DfPostitsUsecase = new DfPostitsUsecase(repository);
    const postitsDto: PostitDto[] = await postitsUsecase.execute(
      rollyId,
      postitThemeList,
      fontFamilyList
    );

    return NextResponse.json({ success: true, postitsDto }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
