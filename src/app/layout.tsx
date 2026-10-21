import type { Metadata, Viewport } from "next";
import { portfolio } from "@/data/portfolio";
import "./globals.css";
export const metadata: Metadata = {
  title: portfolio.title,
  description: portfolio.description,
  ...(portfolio.siteUrl
    ? {
        metadataBase: new URL(portfolio.siteUrl),
        alternates: { canonical: "/" },
      }
    : {}),
  authors: [{ name: portfolio.name }],
  openGraph: {
    title: portfolio.title,
    description: portfolio.description,
    type: "website",
    locale: "en_US",
    siteName: portfolio.name,
    ...(portfolio.siteUrl ? { url: portfolio.siteUrl } : {}),
  },
  twitter: {
    card: "summary",
    title: portfolio.title,
    description: portfolio.description,
  },
  robots: {
    index: Boolean(portfolio.siteUrl),
    follow: Boolean(portfolio.siteUrl),
  },
};
export const viewport: Viewport = { themeColor: "#f9f8f5" };
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
