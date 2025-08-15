import { NextResponse } from "next/server";

export const middleware = async (request) => {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;
  if (
    token &&
    (pathname.startsWith("/auth/login") ||
      pathname.startsWith("/auth/register"))
  ) {
    const loginUrl = new URL("/user", request.url);
    return NextResponse.redirect(loginUrl);
  }
  if (!token && pathname.startsWith("/user")) {
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
};
export const config = {
  matcher: ["/user/:path*", "/admin/:path*", "/auth/:path*"],
};
