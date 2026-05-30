import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";

const BASE = "https://drakurei.github.io/portfolio-jd";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/a-propos",
    "/services",
    "/portfolio",
    "/tarifs",
    "/cv",
    "/faq",
    "/temoignages",
    "/contact",
    "/mentions-legales",
    "/confidentialite",
    "/cgu",
  ];
  const now = new Date();

  const pages = routes.map((r) => ({
    url: `${BASE}${r}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : 0.7,
  }));

  const caseStudies = projects.map((p) => ({
    url: `${BASE}/portfolio/${p.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...caseStudies];
}
