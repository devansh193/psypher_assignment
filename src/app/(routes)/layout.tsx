"use client";
import { MainLayout } from "@/modules/main/layout";
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isLoaded: userLoaded, user, isSignedIn } = useUser();
  const processedUsers = useRef(new Set<string>());

  useEffect(() => {
    const checkTier = async () => {
      if (userLoaded && isSignedIn && user) {
        const tier = user.publicMetadata?.tier;
        const userId = user.id;
        if (!tier && !processedUsers.current.has(userId)) {
          try {
            await fetch("/api/tier", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ userId }),
            });
            processedUsers.current.add(userId);
          } catch (error) {
            console.error("Failed to set user tier:", error);
          }
        }
      }
    };
    if (userLoaded && isSignedIn && user) {
      checkTier();
    }
  }, [userLoaded, isSignedIn, user]);

  return <MainLayout>{children}</MainLayout>;
};

export default Layout;
