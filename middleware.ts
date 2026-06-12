
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const user = req.cookies.get("user");
  const role = req.cookies.get("role");

  const path = req.nextUrl.pathname;

  // Protect admin routes
  if (path.startsWith("/admin")) {
    if (!user || role?.value !== "admin") {
      return NextResponse.redirect(
        new URL("/login", req.url)
      );
    }
  }

  // Protect student routes
  if (path.startsWith("/student")) {
    if (!user || role?.value !== "student") {
      return NextResponse.redirect(
        new URL("/login", req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/student/:path*",
  ],
};

