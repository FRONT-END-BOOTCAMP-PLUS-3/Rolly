import nodemailer from "nodemailer";

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com",
      pass: "your-email-password",
    },
  });

  async sendEmails(from: string, to: string[], message: string): Promise<void> {
    for (const recipient of to) {
      await this.transporter.sendMail({
        from: from,
        to: recipient,
        subject: "새로운 답장이 도착했습니다!",
        text: message,
      });
    }
  }
}
