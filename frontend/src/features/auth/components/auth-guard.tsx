"use client";

import { useAuth } from "../context/auth-context";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

// Define our protected routes and authentication rules
const AUTH_RULES = {
  // Routes that require authentication and completed onboarding
  PROTECTED_ROUTES: ["/add", "/settings"],
  // Routes only accessible when logged out
  LOGGED_OUT_ROUTES: ["/login", "/signup"],
  // Routes that require authentication but no onboarding
  ONBOARDING_ROUTES: ["/onboarding"],
};

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    // Case 1: User is not logged in
    if (!user) {
      if (
        [...AUTH_RULES.PROTECTED_ROUTES, ...AUTH_RULES.ONBOARDING_ROUTES].includes(
          pathname
        )
      ) {
        router.push("/login");
        return;
      }
    }

    // Case 2: User is logged in but hasn't completed onboarding
    if (user && !user.is_onboarding_complete) {
      if (pathname !== "/onboarding") {
        router.push("/onboarding");
        return;
      }
    }

    // Case 3: User is logged in and has completed onboarding
    if (user && user.is_onboarding_complete) {
      if (
        [...AUTH_RULES.LOGGED_OUT_ROUTES, ...AUTH_RULES.ONBOARDING_ROUTES].includes(
          pathname
        )
      ) {
        router.push("/");
        return;
      }
    }
  }, [user, isLoading, pathname, router]);

  // Show nothing while checking authentication
  if (isLoading) {
    return null;
  }

  return <>{children}</>;
}
