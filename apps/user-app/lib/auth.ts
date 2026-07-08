import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: number;
  iat: number;
  exp: number;
}

export function getUserIdFromRequest(request: NextRequest): number | null {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return null;
  }

  const key = process.env.SECRET_KEY;

  if (!key) {
    // Misconfigured server treat as unauthenticated rather than crashing
    console.error("SECRET_KEY is not set in environment variables");
    return null;
  }

  try {
    const decoded = jwt.verify(token, key) as DecodedToken;
    return decoded.id;
  } catch (error) {
    // Covers: expired token, invalid signature, malformed token — all
    // treated the same way, as "not authenticated"
    return null;
  }
}