import type { MetadataRoute } from "next";
import { portfolio } from "@/data/portfolio";
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return portfolio.siteUrl
    ? {
        rules: { userAgent: "*", allow: "/" },
        sitemap: new URL("/sitemap.xml", portfolio.siteUrl).href,
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
