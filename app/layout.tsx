import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConversionDock from "./ConversionDock";
import ConversionTracker from "./ConversionTracker";
import { BetaEnvironmentBanner } from "./BetaEnvironmentBanner";
import SafeLinkMaskLayer from "./SafeLinkMaskLayer";
import JunglePrelaunchCurtain from "./JunglePrelaunchCurtain";
import { SHOP_ORIGIN } from "@/lib/environment";
import {
  betaOnlyRobots,
  isPublicJungleDeployment,
} from "@/lib/deployment-mode";
import { isPublicPrelaunchCurtainActive } from "@/lib/public-prelaunch";

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
  title: "TIBALDO Jungle — Studio Végétal à Lille",
  description:
    "Nouveauté à Lille : Studio Végétal Tibaldo Jungle, boutique de plantes rares et exotiques. Ouverture le 26 septembre 2026, rempotage gratuit.",
  applicationName: "TIBALDO Jungle",
  keywords: [
    "boutique de plantes rares à Lille",
    "plantes exotiques à Lille",
    "studio végétal Lille",
  ],
  alternates: { canonical: "/" },
  ...(betaOnlyRobots ? { robots: betaOnlyRobots } : {}),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "TIBALDO Jungle",
    title: "TIBALDO Jungle — Studio Végétal à Lille",
    description:
      "Nouveauté à Lille : une boutique de plantes rares et exotiques, des conseils sincères et un rempotage offert pour l’inauguration.",
    images: [
      {
        url: "/media/projet-boutique-tibaldo-jungle-lille.webp",
        width: 1200,
        height: 630,
        alt: "Tibaldo Jungle, future boutique de plantes rares et exotiques à Lille",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TIBALDO Jungle — Studio Végétal à Lille",
    description:
      "Nouveauté à Lille : boutique de plantes rares et exotiques. Ouverture le 26 septembre 2026.",
    images: ["/media/projet-boutique-tibaldo-jungle-lille.webp"],
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
  const prelaunchCurtainActive = isPublicPrelaunchCurtainActive(
    isPublicJungleDeployment,
  );

  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BetaEnvironmentBanner />
        <a
          className="skip-link"
          href="#contenu-principal"
          inert={prelaunchCurtainActive || undefined}
          aria-hidden={prelaunchCurtainActive || undefined}
        >
          Aller au contenu principal
        </a>
        <div
          id="contenu-principal"
          tabIndex={-1}
          inert={prelaunchCurtainActive || undefined}
          aria-hidden={prelaunchCurtainActive || undefined}
        >
          {children}
        </div>
        <ConversionDock inert={prelaunchCurtainActive} />
        <ConversionTracker />
        {isPublicJungleDeployment ? (
          <SafeLinkMaskLayer shopOrigin={SHOP_ORIGIN} />
        ) : null}
        {prelaunchCurtainActive ? <JunglePrelaunchCurtain /> : null}
      </body>
    </html>
  );
}
