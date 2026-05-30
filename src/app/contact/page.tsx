import type { Metadata } from "next";
import ContactConsulting from "@/components/ContactConsulting";

export const metadata: Metadata = {
  title: "Contact",
  description: "Discutons de votre projet — demande d'expertise, devis, collaboration. Réponse sous 24h.",
};

export default function ContactPage() {
  return (
    <main className="pt-24">
      <ContactConsulting />
    </main>
  );
}
