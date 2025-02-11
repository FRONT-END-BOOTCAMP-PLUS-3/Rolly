import { NextResponse } from "next/server";
import { DfReplyUsecase } from "@/application/usecases/saves/DfReplyUsecase";

export async function POST(req: Request) {
  const replyUsecase = new DfReplyUsecase();
  try {
    const { sender, receiverEmails, message } = await req.json();

    await replyUsecase.sendReply(sender, receiverEmails, message);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("이메일 전송 에러:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "알 수 없는 오류 발생",
      },
      { status: 500 }
    );
  }
}
