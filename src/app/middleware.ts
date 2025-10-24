import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Páginas públicas
  if (url.pathname === "/login") return NextResponse.next();

  const token = req.cookies.get("token")?.value || req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/produtos/:path*", "/movements/:path*"]
};
