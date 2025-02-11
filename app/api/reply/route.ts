import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { sender, receiverEmails, message } = await req.json();

    if (!sender || !receiverEmails || receiverEmails.length === 0 || !message) {
      return NextResponse.json(
        { error: "잘못된 요청 데이터입니다." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SUPABASE_SMTP_HOST,
      port: Number(process.env.SUPABASE_SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SUPABASE_SMTP_USER,
        pass: process.env.SUPABASE_SMTP_PASS,
      },
    });

    // 이메일 전송
    const info = await transporter.sendMail({
      from: process.env.SUPABASE_SMTP_HOST,
      to: receiverEmails.join(","), // 배열 -> 문자열 변환
      subject: "Rolly 답장이 도착했습니다!",
      text: `\n${sender}님의 Rolly 답장 :\n\n${message}`,
    });

    console.log("이메일 전송 성공:", info);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("이메일 전송 에러:", error);

    const errorMessage =
      error instanceof Error ? error.message : "알 수 없는 오류 발생";

    return NextResponse.json(
      { error: `이메일 전송 중 오류 발생: ${errorMessage}` },
      { status: 500 }
    );
  }
}
