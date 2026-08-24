import cn from "classnames";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { SmoothScroll } from "@/app/_components/smooth-scroll";
import { ThemeSwitcher } from "./_components/theme-switcher";

import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "lenis/dist/lenis.css";

const inter = Inter({ subsets: ["latin"] });
const siteUrl = "https://francyaraujo.com";
const siteTitle =
  "Francy Araújo | Cabeleireira e especialista em ruivos em Fortaleza";
const siteDescription =
  "Francy Araújo é cabeleireira e hair stylist especialista em ruivos, cortes, colorações e tratamentos em Dionísio Torres, Fortaleza. Agende pelo WhatsApp.";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HairSalon",
      "@id": `${siteUrl}/#salao`,
      name: "Francy Araújo",
      alternateName: "Francy Araújo Cenário",
      description: siteDescription,
      url: siteUrl,
      image: `${siteUrl}/og.jpg`,
      telephone: "+55 88 8190-2582",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rua Israel Bezerra, 46",
        addressLocality: "Fortaleza",
        addressRegion: "CE",
        addressCountry: "BR",
      },
      areaServed: [
        {
          "@type": "City",
          name: "Fortaleza",
        },
        {
          "@type": "Place",
          name: "Dionísio Torres",
        },
      ],
      sameAs: ["https://www.instagram.com/francyaraujocenario/"],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+55 88 8190-2582",
        contactType: "appointments",
        availableLanguage: "Portuguese",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Serviços de beleza",
        itemListElement: [
          "Cortes de cabelo",
          "Coloração e ruivos",
          "Tratamentos capilares",
          "Manicure",
          "Depilação",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name,
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Francy Araújo",
      description: siteDescription,
      inLanguage: "pt-BR",
      publisher: { "@id": `${siteUrl}/#salao` },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  applicationName: "Francy Araújo",
  authors: [{ name: "Francy Araújo", url: siteUrl }],
  creator: "Francy Araújo",
  publisher: "Francy Araújo",
  category: "beleza",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Francy Araújo",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og.jpg"],
  },
  keywords: [
    "Francy Araújo",
    "francyaraujocenario",
    "cabeleireira em Fortaleza",
    "hair stylist em Fortaleza",
    "especialista em ruivos Fortaleza",
    "salão de beleza Dionísio Torres",
    "cortes",
    "coloração",
    "tratamentos capilares",
  ],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is static, owned data and escapes opening brackets.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
          type="application/ld+json"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png?v=2"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png?v=2"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png?v=2"
        />
        <link rel="manifest" href="/favicon/site.webmanifest?v=2" />
        <link rel="shortcut icon" href="/favicon/favicon.ico?v=2" />
        <meta name="msapplication-TileColor" content="#8b1721" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#1c120e" />
      </head>
      <body
        className={cn(
          inter.className,
          "bg-[#1c120e] text-white dark:bg-[#1c120e] dark:text-white",
        )}
      >
        <SmoothScroll>
          <ThemeSwitcher />
          <div className="min-h-screen">{children}</div>
        </SmoothScroll>
      </body>
    </html>
  );
}
