import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConversionDock from "./ConversionDock";
import ConversionTracker from "./ConversionTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jungle.tibaldo.fr"),
  title: "Tibaldo Jungle — Studio Végétal à Lille",
  description:
    "Nouveauté à Lille : Studio Végétal Tibaldo Jungle, boutique de plantes rares et exotiques. Ouverture le 26 septembre 2026, rempotage gratuit.",
  applicationName: "Studio Végétal — Tibaldo Jungle",
  keywords: [
    "boutique de plantes rares à Lille",
    "plantes exotiques à Lille",
    "studio végétal Lille",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Studio Végétal — Tibaldo Jungle",
    title: "Tibaldo Jungle — Studio Végétal à Lille",
    description:
      "Nouveauté à Lille : une boutique de plantes rares et exotiques, des conseils sincères et un rempotage offert pour l’inauguration.",
    images: [
      {
        url: "/projet-boutique-tibaldo-jungle-lille.webp",
        width: 1200,
        height: 630,
        alt: "Tibaldo Jungle, future boutique de plantes rares et exotiques à Lille",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tibaldo Jungle — Studio Végétal à Lille",
    description:
      "Nouveauté à Lille : boutique de plantes rares et exotiques. Ouverture le 26 septembre 2026.",
    images: ["/projet-boutique-tibaldo-jungle-lille.webp"],
  },
  category: "boutique de plantes",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml", sizes: "any" }],
    shortcut: "/favicon.svg",
    apple: [{ url: "/favicon.png", sizes: "192x192", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a className="skip-link" href="#contenu-principal">Aller au contenu principal</a>
        <div id="contenu-principal" tabIndex={-1}>{children}</div>
        <ConversionDock />
        <ConversionTracker />
      </body>
    </html>
  );
}
