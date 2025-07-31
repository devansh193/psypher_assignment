"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export const UserDetails = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="p-6 w-full max-w-md rounded-xl shadow-md animate-pulse space-y-4">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-700" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-700" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-red-500 p-4 bg-red-100 dark:bg-red-900 rounded-md">
        User not found.
      </div>
    );
  }

  const tier =
    typeof user.publicMetadata?.tier === "string"
      ? user.publicMetadata.tier.charAt(0).toUpperCase() +
        user.publicMetadata.tier.slice(1)
      : "Not set";

  return (
    <div className="p-6 w-full max-w-md rounded-xl shadow-md">
      <div className="flex items-center space-x-4">
        <Image
          src={user.imageUrl || "/default-avatar.png"}
          alt="User Avatar"
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {user.fullName || user.username || "Anonymous User"}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {user.emailAddresses?.[0]?.emailAddress || "No email"}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Tier: {tier}
          </p>
        </div>
      </div>
    </div>
  );
};
