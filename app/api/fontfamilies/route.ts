import { DfFontFamilyListUsecase } from "@/application/usecases/fontFamily/DfFontFamilyListUsecase";
import { SbFontFamilyRepository } from "@/infrastructure/repositories/SbFontFamilyRepository";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const repository = new SbFontFamilyRepository();
    const fontFamilyListUsecase = new DfFontFamilyListUsecase(repository);
    const fontFamilyList = await fontFamilyListUsecase.execute();

    if (!fontFamilyList || fontFamilyList.length === 0) {
      return NextResponse.json(
        { error: "font family list 가져오기 실패" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: fontFamilyList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching font family list:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
