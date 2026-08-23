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

export const metadata: Metadata = {
  metadataBase: new URL("https://francyaraujo.com"),
  title: "Francy Araújo | Beleza, estilo e confiança",
  description:
    "Francy Araújo, hair stylist especialista em ruivos e beleza em Fortaleza.",
  openGraph: {
    title: "Francy Araújo | Beleza, estilo e confiança",
    description: "Hair stylist especialista em ruivos e beleza em Fortaleza.",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Francy Araújo | Beleza, estilo e confiança",
    description: "Hair stylist especialista em ruivos e beleza em Fortaleza.",
    images: ["/og.jpg"],
  },
  keywords: ["blog", "beleza", "hairstylist", "ruivo", "Fortaleza"],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <meta
          name="keywords"
          content="blog, beleza, hairstylist, ruivo, Fortaleza"
        />
        <meta name="author" content="Francy Araujo" />
        <meta name="robots" content="index, follow" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
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
