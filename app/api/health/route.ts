import { NextResponse } from "next/server";

// Simple health check endpoint for Docker and monitoring
export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
    },
    { status: 200 }
  );
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
