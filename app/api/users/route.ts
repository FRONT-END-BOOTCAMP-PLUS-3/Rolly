import { DfUserNameUsecase } from "@/application/usecases/user/DfUserNameUsecase";
import { UserNameDto } from "@/application/usecases/user/dto/UserNameDto";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { SbUserRepository } from "@/infrastructure/repositories/SbUserRepository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const repository: UserRepository = new SbUserRepository();
    const userNameUsecase: DfUserNameUsecase = new DfUserNameUsecase(
      repository
    );
    const userNameDto: UserNameDto = await userNameUsecase.execute(userId);

    return NextResponse.json({ success: true, userNameDto }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
