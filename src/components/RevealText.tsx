"use client";

import { useRef, createElement } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";

void SplitText;

type Tag = "h1" | "h2" | "h3" | "p" | "span";

export default function RevealText({
  as = "h2",
  children,
  className = "",
  skew = 6,
  start = "top 85%",
}: {
  as?: Tag;
  children: React.ReactNode;
  className?: string;
  skew?: number;
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const split = SplitText.create(el, { type: "words", wordsClass: "rt-word" });
      gsap.from(split.words, {
        y: 44,
        skewY: skew,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "elastic.out(1, 0.6)",
        scrollTrigger: { trigger: el, start },
      });
      return () => split.revert();
    },
    { scope: ref },
  );

  return createElement(as, { ref, className }, children);
}
