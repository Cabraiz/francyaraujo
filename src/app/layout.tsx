import cn from "classnames";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { InitialSiteLoader } from "@/app/_components/initial-site-loader";
import { SmoothScroll } from "@/app/_components/smooth-scroll";
import { ThemeSwitcher } from "./_components/theme-switcher";

import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "lenis/dist/lenis.css";

const inter = Inter({ subsets: ["latin"] });
const siteUrl = "https://francyaraujo.com";
const instagramUrl = "https://www.instagram.com/francyaraujocenario/";
const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=Rua+Israel+Bezerra%2C+46%2C+Dion%C3%ADsio+Torres%2C+Fortaleza";
const whatsappUrl =
  "https://wa.me/558881902582?text=Ol%C3%A1%2C%20Francy!%20Gostaria%20de%20agendar%20um%20hor%C3%A1rio.";
const siteTitle = "Francy Araújo | Cabeleireira e Ruivos em Fortaleza";
const siteDescription =
  "Cabeleireira e especialista em ruivos em Fortaleza. Cortes, colorações e tratamentos em Dionísio Torres. Agende com Francy Araújo.";

const salonServices = [
  "Cortes de cabelo",
  "Coloração e ruivos",
  "Tratamentos capilares",
  "Manicure",
  "Depilação",
] as const;

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
      logo: `${siteUrl}/favicon/android-chrome-512x512.png?v=4`,
      slogan: "Beleza • Estilo • Confiança",
      telephone: "+55 88 8190-2582",
      priceRange: "$$",
      currenciesAccepted: "BRL",
      hasMap: mapUrl,
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
      sameAs: [instagramUrl],
      employee: { "@id": `${siteUrl}/#francy-araujo` },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+55 88 8190-2582",
        contactType: "appointments",
        availableLanguage: "Portuguese",
        url: whatsappUrl,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Serviços de beleza",
        itemListElement: salonServices.map((name) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name,
            areaServed: "Fortaleza, CE",
            provider: { "@id": `${siteUrl}/#salao` },
          },
        })),
      },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#francy-araujo`,
      name: "Francy Araújo",
      jobTitle: "Cabeleireira e especialista em ruivos",
      description:
        "Hair stylist especializada em cabelos ruivos, cortes, colorações e tratamentos em Fortaleza.",
      url: siteUrl,
      image: `${siteUrl}/og.jpg`,
      sameAs: [instagramUrl],
      worksFor: { "@id": `${siteUrl}/#salao` },
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
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#pagina-inicial`,
      url: siteUrl,
      name: siteTitle,
      description: siteDescription,
      inLanguage: "pt-BR",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#salao` },
      mainEntity: { "@id": `${siteUrl}/#salao` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${siteUrl}/og.jpg`,
        width: 1200,
        height: 630,
      },
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
    types: {
      "text/markdown": "/index.md",
    },
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
    "cabeleireira Dionísio Torres",
    "ruivo acobreado Fortaleza",
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
    <html data-site-loading="true" lang="pt-BR">
      <head>
        <link rel="describedby" href="/llms.txt" type="text/markdown" />
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
          href="/favicon/apple-touch-icon.png?v=4"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png?v=4"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png?v=4"
        />
        <link rel="manifest" href="/favicon/site.webmanifest?v=4" />
        <link rel="shortcut icon" href="/favicon/favicon.ico?v=4" />
        <meta name="msapplication-TileColor" content="#8b1721" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#1c120e" />
        <noscript>
          <style>{`
            html[data-site-loading] { overflow: auto !important; }
            .site-initial-loader { display: none !important; }
            .site-content { opacity: 1 !important; visibility: visible !important; }
          `}</style>
        </noscript>
      </head>
      <body
        className={cn(
          inter.className,
          "bg-[#1c120e] text-white dark:bg-[#1c120e] dark:text-white",
        )}
      >
        <InitialSiteLoader />
        <SmoothScroll>
          <ThemeSwitcher />
          <noscript>
            <nav
              aria-label="Navegação sem JavaScript"
              className="no-script-navigation"
              data-agent-fallback="navigation"
            >
              <strong>Francy Araújo</strong>
              <span>Esta navegação funciona sem JavaScript:</span>
              <a href="/#servicos">Serviços</a>
              <a href="/#historia">História</a>
              <a href={whatsappUrl}>Agendar pelo WhatsApp</a>
              <a href={instagramUrl}>Instagram</a>
              <a href="/index.md">Versão em Markdown</a>
              <a href="/llms.txt">Índice para agentes de IA</a>
            </nav>
          </noscript>
          <div className="site-content min-h-screen">{children}</div>
        </SmoothScroll>
      </body>
    </html>
  );
}
