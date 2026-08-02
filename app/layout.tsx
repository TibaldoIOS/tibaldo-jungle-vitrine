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
  title: "Boutique de plantes rares à Lille | Tibaldo Jungle",
  description:
    "Découvrez Tibaldo Jungle, nouvelle boutique de plantes rares et exotiques à Lille : sélection d’un passionné, rempotage, substrats en vrac et conseils personnalisés.",
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
    title: "Tibaldo Jungle, boutique de plantes rares et exotiques à Lille",
    description:
      "Une nouvelle boutique née de la passion du végétal vivant : plantes rares et exotiques, rempotage, substrats en vrac et conseils à Lille.",
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
    title: "Tibaldo Jungle, plantes rares et exotiques à Lille",
    description:
      "Découvrez un Studio Végétal vivant, imaginé par un passionné de plantes à Lille.",
    images: ["/boutique-projet-ia.webp"],
  },
  category: "boutique de plantes",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
        {children}
      </body>
    </html>
  );
}
