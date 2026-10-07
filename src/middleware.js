import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  // =========================
  // Patient - Public
  // =========================

  if (pathname.startsWith("/Patient")) {
    return NextResponse.next();
  }

  // =========================
  // Login
  // =========================

  if (pathname === "/") {
    if (!token) {
      return NextResponse.next();
    }

    if (role === "platform_admin") {
      return NextResponse.redirect(
        new URL("/Admin", request.url)
      );
    }

    if (role === "hospital_admin") {
      return NextResponse.redirect(
        new URL("/Hospital", request.url)
      );
    }

    return NextResponse.next();
  }

  // =========================
  // Protected Routes
  // =========================

  if (!token) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  // =========================
  // Admin
  // =========================

  if (pathname.startsWith("/Admin")) {
    if (role !== "platform_admin") {
      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }

    return NextResponse.next();
  }

  // =========================
  // Hospital
  // =========================

  if (pathname.startsWith("/Hospital")) {
    if (role !== "hospital_admin") {
      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};