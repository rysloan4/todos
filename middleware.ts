import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "./app/lib/prisma";

export function middleware(request: NextRequest) {
  const apiKey = request.headers.get("Authorization");
  if (!apiKey) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export const config = {
  matcher: "/api/:path*",
};
