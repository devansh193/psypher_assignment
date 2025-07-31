"use client";
import { MainLayout } from "@/modules/main/layout";
import { useSession, useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isLoaded: userLoaded, user, isSignedIn } = useUser();
  const { isLoaded: sessionLoaded, session } = useSession();
  const processedUsers = useRef(new Set<string>());

  useEffect(() => {
    const checkTier = async () => {
      if (userLoaded && sessionLoaded && isSignedIn && user && session) {
        const tier = session?.lastActiveToken?.jwt?.claims?.tier;
        console.log("User tier:", tier);
        console.log("User ID:", user.id);
        const userId = user.id;
        if (!tier && !processedUsers.current.has(userId)) {
          try {
            await fetch("/api/tier", {
              method: "POST",
              body: JSON.stringify({ userId }),
            });
            processedUsers.current.add(userId);
          } catch (error) {
            console.error("Failed to set user tier:", error);
          }
        }
      }
    };
    if (userLoaded && sessionLoaded && isSignedIn && user) {
      checkTier();
    }
  }, [userLoaded, sessionLoaded, isSignedIn, user, session]);

  return <MainLayout>{children}</MainLayout>;
};

export default Layout;
