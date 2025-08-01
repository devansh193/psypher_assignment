"use client";

import { useUser } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const UserDetails = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <Card className="w-full max-w-sm">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="w-full max-w-md border-destructive">
        <CardContent className="p-4 text-destructive">
          User not found.
        </CardContent>
      </Card>
    );
  }

  const tier =
    typeof user.publicMetadata?.tier === "string"
      ? user.publicMetadata.tier.charAt(0).toUpperCase() +
        user.publicMetadata.tier.slice(1)
      : "Not set";

  return (
    <Card className="w-full max-w-md mx-auto items-start justify-center">
      <CardContent className="">
        <div className="flex flex-row items-center gap-2">
          <div className="space-y-1.5">
            <h2 className="text-lg font-semibold leading-none tracking-tight line-clamp-1">
              {user.fullName || user.username || "Guest User"}
            </h2>

            <p className="text-sm text-muted-foreground line-clamp-1">
              {user.emailAddresses?.[0]?.emailAddress || "No email"}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                Tier: {tier}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
