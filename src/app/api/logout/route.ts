
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Redirect to NextAuth signout
    return NextResponse.json({ 
      message: "Logged out",
      redirectUrl: "/api/logout"
    });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}