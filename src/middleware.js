"use client"
import { NextResponse } from "next/server";
import Cookies from "js-cookie";
export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt"
  ) {
    return NextResponse.next();
  }

  // Patient pages are public
  if (pathname.startsWith("/Patient")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;
  const role = Cookies.get("role")?.value;

  // Login page
  if (pathname === "/") {
    if (!token) {
      return NextResponse.next();
    }

    if (role === "platform_admin") {
      return NextResponse.redirect(new URL("/Admin", request.url));
    }

    if (role === "hospital_admin") {
      return NextResponse.redirect(new URL("/Hospital", request.url));
    }

    return NextResponse.next();
  }

  // Admin dashboard
  if (pathname.startsWith("/Admin")) {
    if (!token || role !== "platform_admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  // Hospital dashboard
  if (pathname.startsWith("/Hospital")) {
    if (!token || role !== "hospital_admin") {
      return NextResponse.redirect(new URL("/", request.url));
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
