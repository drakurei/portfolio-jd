import type { Metadata } from "next";
import Pricing from "@/components/sections/Pricing";

export const metadata: Metadata = {
  title: "Tarifs",
  description: "Grille de tarifs claire et premium : landing, site full‑stack, conseil & audit.",
};

export default function TarifsPage() {
  return (
    <main className="pt-24">
      <Pricing />
    </main>
  );
}
