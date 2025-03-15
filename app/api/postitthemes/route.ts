import { SbPostitThemeRepository } from "@/infrastructure/repositories/SbPostitThemeRepository";
import { DfPostitThemeListUsecase } from "@/application/usecases/postitTheme/DfPostitThemeListUsecase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const repository = new SbPostitThemeRepository();
    const postitThemeListUsecase = new DfPostitThemeListUsecase(repository);
    const postitThemeList = await postitThemeListUsecase.execute();

    if (!postitThemeList || postitThemeList.length === 0) {
      return NextResponse.json(
        { error: "postit theme list 가져오기 실패" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: postitThemeList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching postit theme list:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
