import { DfSavedRollyUsecase } from "@/application/usecases/rolly/DfSavedRollyUsecase";
import { SbRollyRepository } from "@/infrastructure/repositories/SbRollyRepository";
import { SbSavedRollyRepository } from "@/infrastructure/repositories/SbSavedRollyRepository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const savedRollyRepository = new SbSavedRollyRepository();
  const rollyRepository = new SbRollyRepository();
  const savedRollyusecase = new DfSavedRollyUsecase(
    savedRollyRepository,
    rollyRepository
  );

  try {
    const savedRollies = await savedRollyusecase.execute(userId);
    return NextResponse.json(savedRollies, { status: 200 });
  } catch (error) {
    console.error("Error fetching saved rollies:", error);
    return NextResponse.json(
      { error: "Failed to fetch saved rollies" },
      { status: 500 }
    );
  }
}
