import { DfUserInfoUsecase } from "@/application/usecases/user/DfUserInfoUsecase";
import { UserInfoDto } from "@/application/usecases/user/dto/UserInfoDto";
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
    const userNameUsecase: DfUserInfoUsecase = new DfUserInfoUsecase(
      repository
    );
    const UserInfo: UserInfoDto = await userNameUsecase.execute(userId);

    return NextResponse.json({ success: true, UserInfo }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
