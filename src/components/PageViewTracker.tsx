"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackView } from "@/lib/stats";

export default function PageViewTracker() {
  const pathname = usePathname();
  useEffect(() => {
    trackView(pathname);
  }, [pathname]);
  return null;
}
