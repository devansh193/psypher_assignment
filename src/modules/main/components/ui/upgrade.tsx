"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const Upgrade = () => {
  const { user } = useUser();
  const [isUpgrading, setIsUpgrading] = useState(false);
  const queryClient = useQueryClient();

  const currentTier = (user?.publicMetadata?.tier as string) || "free";

  const tierHierarchy = ["free", "silver", "gold", "platinum"];
  const currentTierIndex = tierHierarchy.indexOf(currentTier);
  const availableUpgrades = tierHierarchy.slice(currentTierIndex + 1);

  const handleUpgrade = async (tier: string) => {
    if (!user) return;
    setIsUpgrading(true);
    try {
      const response = await fetch("/api/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          tier: tier,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Tier updated:", result);
        await user.reload();
        queryClient.invalidateQueries({ queryKey: ["events"] });
      } else {
        console.error("Failed to upgrade tier");
      }
    } catch (error) {
      console.error("Error upgrading tier:", error);
    } finally {
      setIsUpgrading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isUpgrading}>
        <Button
          variant={"outline"}
          disabled={isUpgrading || availableUpgrades.length === 0}
        >
          {isUpgrading
            ? "Upgrading..."
            : availableUpgrades.length === 0
            ? "Max Tier Reached"
            : "Upgrade"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {availableUpgrades.length === 0 ? (
          <DropdownMenuItem disabled>
            You&apos;re already at the highest tier ({currentTier})
          </DropdownMenuItem>
        ) : (
          availableUpgrades.map((tier) => (
            <DropdownMenuItem key={tier} onClick={() => handleUpgrade(tier)}>
              {tier.charAt(0).toUpperCase() + tier.slice(1)}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
