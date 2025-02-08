import { DfRollyThemeListUsecase } from "@/application/usecases/rollyTheme/DfRollyThemeListUsecase";
import { SbRollyThemeRepository } from "@/infrastructure/repositories/SbRollyThemeRepository";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const repository = new SbRollyThemeRepository();
    const rollyThemeListUsecase = new DfRollyThemeListUsecase(repository);
    const rollyThemeList = await rollyThemeListUsecase.execute();

    if (!rollyThemeList || rollyThemeList.length === 0) {
      return NextResponse.json(
        { error: "rolly theme list 가져오기 실패" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: rollyThemeList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching rolly theme list:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
