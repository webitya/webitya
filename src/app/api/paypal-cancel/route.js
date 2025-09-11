import { NextResponse } from "next/server"

export async function GET(request) {
  console.log("[v0] PayPal payment cancelled")

  return NextResponse.redirect(new URL("/pay-online?cancelled=true", request.url))
}
