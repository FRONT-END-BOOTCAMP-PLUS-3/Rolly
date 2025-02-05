import { NextRequest, NextResponse } from "next/server";
import { DfLockRollyUsecase } from "@/application/usecases/rolly/DfLockRollyUsecase";
import { DfDeleteRollyUsecase } from "@/application/usecases/rolly/DfDeleteRollyUsecase";

const lockRollyUsecase = new DfLockRollyUsecase();
const deleteRollyUsecase = new DfDeleteRollyUsecase();

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await lockRollyUsecase.execute(Number(id));
  return NextResponse.json(
    { success: true, message: `롤리 ${id} 잠금 완료` },
    { status: 200 }
  );
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params; // URL에서 id 추출

  await deleteRollyUsecase.execute(Number(id));
  return NextResponse.json(
    { success: true, message: `롤리 ${id} 삭제 완료` },
    { status: 200 }
  );
}
