import nodemailer from "nodemailer";

export class DfReplyUsecase {
  private transporter;

  constructor() {
    // SMTP 설정
    this.transporter = nodemailer.createTransport({
      host: process.env.SUPABASE_SMTP_HOST,
      port: Number(process.env.SUPABASE_SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SUPABASE_SMTP_USER,
        pass: process.env.SUPABASE_SMTP_PASS,
      },
    });
  }

  public async sendReply(
    sender: string,
    receiverEmails: string[],
    message: string
  ): Promise<void> {
    if (!sender || !receiverEmails || receiverEmails.length === 0 || !message) {
      throw new Error("잘못된 요청 데이터입니다.");
    }

    await this.transporter.sendMail({
      from: process.env.SUPABASE_SMTP_USER,
      to: receiverEmails.join(","),
      subject: "Rolly 답장이 도착했습니다!",
      text: `\n${sender}님의 Rolly 답장 :\n\n${message}`,
    });

    console.log("이메일 전송 성공");
  }
}
