import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  // ✅ httpOnly 쿠키 삭제
  response.headers.append(
    "Set-Cookie",
    "supabase_auth_token=; Path=/; HttpOnly; Secure; SameSite=Lax;"
  );

  return response;
}
