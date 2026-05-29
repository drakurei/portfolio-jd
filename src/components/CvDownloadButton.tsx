"use client";

import { useState } from "react";
import { cv } from "@/content/cv";

export default function CvDownloadButton() {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    try {
      const { downloadCvPdf } = await import("@/lib/cvPdf");
      await downloadCvPdf(cv);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="rounded-full bg-indigo px-6 py-3 text-sm font-medium text-white transition hover:bg-indigo-bright disabled:opacity-50"
    >
      {loading ? "Génération…" : "Télécharger le CV (PDF)"}
    </button>
  );
}
