import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, phone, message } = await req.json();
  if (!name || !email || !message) {
    return NextResponse.json({ error: "name, email and message are required" }, { status: 400 });
  }
  // In production: integrate with email service (Resend, SendGrid, etc.)
  console.log("Contact form submission:", { name, email, phone, message, timestamp: new Date().toISOString() });
  return NextResponse.json({ success: true });
}
