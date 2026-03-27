import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UNLINK-TH :: Security Audit Node",
  description:
    "Centralized Security Audit & Compliance Log for UNLINK-GLOBAL Ecosystem.",
};

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        {/* @identity 9mza */}
      </body>
    </html>
  );
}
