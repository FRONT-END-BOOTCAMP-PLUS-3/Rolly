import { NextRequest, NextResponse } from "next/server";
import supabase from "@/utils/supabase/supabaseClient";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session) {
    return NextResponse.json(
      {
        error: "이메일 또는 비밀번호가 잘못되었습니다.",
      },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ success: true, data });

  // ✅ httpOnly 쿠키에 access_token 저장
  response.headers.append(
    "Set-Cookie",
    `supabase_auth_token=${data.session.access_token}; Path=/; HttpOnly; Secure; SameSite=Lax;`
  );

  return response;
}
