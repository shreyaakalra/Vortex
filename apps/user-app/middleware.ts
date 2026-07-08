import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  // No cookie at all — not logged in, kick to sign-in
  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Cookie exists — let the request through.
  // NOTE: this does NOT verify the token is valid/unexpired,
  // it just checks presence. Real verification happens in the
  // API route layer via lib/auth.ts, since jsonwebtoken needs
  // the Node runtime, not Edge.
  return NextResponse.next();
}

// This tells Next.js WHICH routes this middleware should run on.
// Right now: only /dashboard and anything under it.
// Add more protected page paths here as you build them.
export const config = {
  matcher: ["/dashboard/:path*"],
};