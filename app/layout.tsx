import "./global.scss";

export const metadata = {
  title: "롤리",
  description:
    "마음을 모아 하나의 선물이 되는 순간을 경험해보세요. 롤링페이퍼로 특별한 메시지를 모아 소중한 사람에게 전하세요.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="manifest" href="/manifest.json" />
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
