"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

export default function MagneticButton({
  href,
  children,
  className = "",
  strength = 0.4,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    gsap.to(el, { x, y, duration: 0.4, ease: "power3.out" });
  };

  const onLeave = () => {
    if (ref.current) gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.3)" });
  };

  return (
    <Link
      ref={ref}
      href={href}
      prefetch={false}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-flex items-center gap-3 rounded-full px-8 py-4 font-medium will-change-transform ${className}`}
    >
      {children}
    </Link>
  );
}
