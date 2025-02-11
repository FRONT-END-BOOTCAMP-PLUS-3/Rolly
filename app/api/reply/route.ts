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
    // nodemailer를 사용하여 이메일 전송을 위한 SMTP 설정
    const transporter = nodemailer.createTransport({
      host: process.env.SUPABASE_SMTP_HOST, // SMTP 서버 주소
      port: Number(process.env.SUPABASE_SMTP_PORT), // SMTP 포트 번호
      secure: true, // 보안 연결(SSL/TLS) 사용 여부
      auth: {
        user: process.env.SUPABASE_SMTP_USER, // SMTP 로그인 사용자 이름
        pass: process.env.SUPABASE_SMTP_PASS, // SMTP 로그인 비밀번호
      },
    });

    // 이메일 전송 객체 생성
    const info = await transporter.sendMail({
      from: process.env.SUPABASE_SMTP_USER,
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
