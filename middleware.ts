import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("supabase_auth_token")?.value || "";
  const { pathname } = req.nextUrl;

  let isLoggedIn = false;

  if (token) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    );

    const { data } = await supabase.auth.getUser();
    isLoggedIn = !!data.user;
  }

  // 경로에 확장자가 있으면 `true` 없으면 `null`
  const isFileRequest = pathname.match(/\.\w+$/);

  // 경로에 확장자가 있다면 미들웨어 로직 스킵
  if (isFileRequest) {
    return NextResponse.next();
  }

  // 로그인하지 않은 사용자가 보호된 페이지 접근 시 차단
  // if (!isLoggedIn && pathname.startsWith("/member")) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  // 로그인된 사용자가 / 경로에 접근하면 /member로 리디렉션
  if (isLoggedIn && pathname === "/") {
    return NextResponse.redirect(new URL("/member", req.url));
  }

  if (isLoggedIn && pathname.startsWith("/rollies")) {
    return NextResponse.redirect(new URL(`/member${pathname}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
