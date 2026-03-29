import type { Metadata } from "next";
import { siteConfig } from "@/constants/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo?.defaultTitle || siteConfig.name,
    template: siteConfig.seo?.titleTemplate || `%s | ${siteConfig.name}`,
  },
  description: siteConfig.seo?.defaultDescription || siteConfig.description,
  keywords: siteConfig.seo?.keywords || [],
  openGraph: {
    title: siteConfig.seo?.defaultTitle || siteConfig.name,
    description: siteConfig.seo?.defaultDescription || siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale || "th_TH",
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo?.defaultTitle || siteConfig.name,
    description: siteConfig.seo?.defaultDescription || siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CookieBanner } from "@/components/CookieBanner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "logo": `${siteConfig.url}/logo.png`,
    "founder": {
      "@type": "Person",
      "name": siteConfig.founder.name || siteConfig.founder.nameTh,
      "alternateName": siteConfig.founder.nickname,
    },
    "mainEntityOfPage": {
      "@type": "WebSite",
      "name": siteConfig.fullName || siteConfig.name,
      "url": siteConfig.url,
      "description": siteConfig.description,
      "publisher": {
        "@type": "Organization",
        "name": siteConfig.developer?.name || "AEMDEVWEB",
        "sameAs": siteConfig.founder.sameAs || [],
      },
    },
  };

  return (
    <html lang={siteConfig.language || "th"}>
      <body className="bg-background text-foreground min-h-screen font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <CookieBanner />
        <main>{children}</main>
        <Footer />
        {/* @identity 9mza */}
      </body>
    </html>
  );
}
