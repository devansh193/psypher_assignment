import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

const TierSchema = z.enum(["free", "silver", "gold", "platinum"]);
const RequestBodySchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  tier: TierSchema,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, tier } = RequestBodySchema.parse(body);

    (await clerkClient()).users.updateUserMetadata(userId, {
      publicMetadata: {
        tier,
      },
    });

    return NextResponse.json(
      {
        message: `User tier updated to ${tier}`,
        tier,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed" }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
