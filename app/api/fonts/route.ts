import { NextResponse } from "next/server";
import { fontPairings } from "@/lib/fonts";

export async function GET() {
  try {
    // Get a random font pairing from our predefined list
    const randomPairing =
      fontPairings[Math.floor(Math.random() * fontPairings.length)];

    return NextResponse.json(randomPairing);
  } catch (error) {
    console.error("Error generating font pair:", error);
    return NextResponse.json(
      { error: "Failed to generate font pair" },
      { status: 500 }
    );
  }
}
