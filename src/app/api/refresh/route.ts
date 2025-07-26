
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/key-cloak-auth/next-auth-options";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.access_token) {
      return NextResponse.json({ error: "No session" }, { status: 401 });
    }

    return NextResponse.json({
      accessToken: session.access_token,
      refreshToken: session.refresh_token,
    });
  } catch (error) {
    console.error("Refresh error:", error);
    return NextResponse.json({ error: "Refresh failed" }, { status: 500 });
  }
}