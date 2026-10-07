"use client";
import { NextResponse } from "next/server";
import Cookies from 'js-cookie'

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;
  const role = Cookies.get("role")?.value;

  // ==========================================
  // LOGIN
  // /
  // ==========================================

  if (pathname === "/") {
    // مفيش Login → يفضل في Login
    if (!token) {
      return NextResponse.next();
    }

    // Platform Admin
    if (role === "platform_admin") {
      return NextResponse.redirect(
        new URL("/Admin", request.url)
      );
    }

    // Hospital Admin
    if (role === "hospital_admin") {
      return NextResponse.redirect(
        new URL("/Hospital", request.url)
      );
    }

    // Token أو Role غير صحيح
    const response = NextResponse.next();

    response.cookies.delete("token");
    response.cookies.delete("role");

    return response;
  }

  // ==========================================
  // PATIENT
  // ==========================================

  if (pathname.startsWith("/Patient")) {
    return NextResponse.next();
  }

  // ==========================================
  // أي صفحة أخرى لازم Login
  // ==========================================

  if (!token) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  // ==========================================
  // ADMIN
  // ==========================================

  if (pathname.startsWith("/Admin")) {
    if (role !== "platform_admin") {
      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }

    return NextResponse.next();
  }

  // ==========================================
  // HOSPITAL
  // ==========================================

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