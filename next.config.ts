import withPWA from "next-pwa";

const nextPWA = withPWA({
  dest: "public",
  // disable: process.env.NODE_ENV === "development", // 개발 환경에서 비활성화
});

const nextConfig = {};

export default nextPWA(nextConfig);
