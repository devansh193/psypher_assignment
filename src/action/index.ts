"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { eventTable } from "@/db/schema";
import { inArray } from "drizzle-orm";
import { db } from "..";
import { z } from "zod";

const allowedTiers = ["free", "silver", "gold", "platinum"] as const;
const TierSchema = z.enum(allowedTiers);

type Tier = z.infer<typeof TierSchema>;
const tierRank: Record<Tier, number> = {
  free: 0,
  silver: 1,
  gold: 2,
  platinum: 3,
};

function getAllowedTiers(userTier: Tier): Tier[] {
  const userRank = tierRank[userTier];
  return allowedTiers.filter((tier) => tierRank[tier] <= userRank);
}

export const getEvents = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const user = await currentUser();
  const publicMetadata = user?.publicMetadata;
  const MetadataSchema = z.object({
    tier: TierSchema,
  });

  const parsed = MetadataSchema.safeParse(publicMetadata);

  if (!parsed.success) {
    throw new Error("User tier not found or invalid");
  }

  const tier = parsed.data.tier;
  const allowed = getAllowedTiers(tier);

  const response = await db
    .select()
    .from(eventTable)
    .where(inArray(eventTable.tier, allowed));
  if (!response) {
    throw new Error("Failed to fetch events");
  }
  return {
    events: response,
    status: 200,
    message: "Events fetched successfully",
  };
};
