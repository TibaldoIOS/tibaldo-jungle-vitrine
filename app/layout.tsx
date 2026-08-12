import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    "Nouveauté à Lille : Tibaldo Jungle, Studio Végétal et boutique de plantes rares et exotiques. Ouverture le 26 septembre 2026, rempotage gratuit.",
  applicationName: "Tibaldo Jungle — Studio Végétal",
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
    siteName: "Tibaldo Jungle — Studio Végétal",
    title: "Tibaldo Jungle — Studio Végétal à Lille",
    description:
      "Nouveauté à Lille : une boutique de plantes rares et exotiques, des conseils sincères et un rempotage offert pour l’inauguration.",
    images: [
      {
        url: "/boutique-projet-ia.webp",
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
    images: ["/boutique-projet-ia.webp"],
  },
  category: "boutique de plantes",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "512x512" }],
    shortcut: "/favicon.png",
    apple: [{ url: "/favicon.png", sizes: "512x512", type: "image/png" }],
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
      </body>
    </html>
  );
}
