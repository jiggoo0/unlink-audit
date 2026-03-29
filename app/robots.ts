import { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site-config";

/**
 * UNLINK-AUDIT | Search Engine Accessibility Protocol
 * -------------------------------------------------------------------------
 * หน้าที่: ควบคุมการเข้าถึงของ Search Engine Bot ให้เน้นเฉพาะเนื้อหาคุณภาพ
 */

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url;

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/verify/", "/cases/"],
        disallow: [
          "/api/", // ป้องกันการเข้าถึง Endpoint ภายใน
        ],
      },
      {
        userAgent: "GPTBot",
        disallow: ["/cases/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
