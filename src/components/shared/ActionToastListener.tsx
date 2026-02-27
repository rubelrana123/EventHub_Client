"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const ACTION_QUERY_KEYS = ["loggedIn", "signedUp", "loggedOut", "eventCreated"] as const;

const ActionToastListener = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!searchParams.toString()) {
      return;
    }

    let shouldCleanUrl = false;

    if (searchParams.get("signedUp") === "true") {
      toast.success("Account created successfully. Welcome to EventHub.");
      shouldCleanUrl = true;
    } else if (searchParams.get("loggedIn") === "true") {
      toast.success("Logged in successfully. Welcome back.");
      shouldCleanUrl = true;
    }

    if (searchParams.get("loggedOut") === "true") {
      toast.success("You have been logged out safely.");
      shouldCleanUrl = true;
    }

    if (searchParams.get("eventCreated") === "true") {
      toast.success("Event created successfully. You can now manage it from the list.");
      shouldCleanUrl = true;
    }

    if (!shouldCleanUrl) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams.toString());
    ACTION_QUERY_KEYS.forEach((key) => nextParams.delete(key));
    const nextQuery = nextParams.toString();

    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  return null;
};

export default ActionToastListener;
