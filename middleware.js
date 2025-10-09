import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

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
  if (token && pathname.startsWith("/admin")) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      if (payload.role !== "admin" && payload.role !== "creator") {
        return NextResponse.rewrite(new URL("/403", request.url));
      }
    } catch (err) {
      console.error("JWT Error:", err);
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }
  return NextResponse.next();
};
export const config = {
  matcher: ["/user/:path*", "/admin/:path*", "/auth/:path*"],
};
