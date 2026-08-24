"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useSyncExternalStore } from "react";

import MarcaImage from "./marca";

type Props = {
  title: string;
  coverImage: string;
};

const whatsappNumber = "558881902582";
const whatsappMessage = encodeURIComponent(
  "Olá, Francy! Gostaria de agendar um horário.",
);

const navItems = [
  { name: "HOME", link: "/" },
  { name: "HISTÓRIA", link: "/#historia" },
  { name: "SERVIÇOS", link: "/#servicos" },
  {
    name: "AGENDE AGORA",
    link: `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
  },
] as const;

const desktopQuery = "(min-width: 1200px)";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

function subscribeToDesktopQuery(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(desktopQuery);
  mediaQuery.addEventListener("change", onStoreChange);

  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getDesktopSnapshot() {
  return window.matchMedia(desktopQuery).matches;
}

function getServerSnapshot() {
  return false;
}

export function Intro({ title, coverImage }: Readonly<Props>) {
  const navigation = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isDesktop = useSyncExternalStore(
    subscribeToDesktopQuery,
    getDesktopSnapshot,
    getServerSnapshot,
  );

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) return;

      const brand = navigation.current?.querySelector("[data-scroll-brand]");
      const navItems = navigation.current?.querySelectorAll(
        "[data-scroll-nav-item]",
      );

      if (brand) {
        gsap.from(brand, {
          autoAlpha: 0,
          duration: 0.75,
          ease: "power3.out",
          y: 14,
        });
      }

      if (navItems && navItems.length > 0) {
        gsap.from(navItems, {
          autoAlpha: 0,
          duration: 0.65,
          ease: "power2.out",
          stagger: 0.055,
          y: 10,
        });
      }
    },
    {
      dependencies: [isDesktop],
      revertOnUpdate: true,
      scope: navigation,
    },
  );

  return (
    <nav
      aria-label="Navegação principal"
      className="brand-header navbar navbar-expand-lg navbar-light fade-in py-0"
      data-scroll-intro
      ref={navigation}
      style={{
        height: "var(--site-header-height)",
        transition: "height 0.5s ease-in-out",
        backdropFilter: "blur(18px) saturate(1.05)",
        WebkitBackdropFilter: "blur(18px) saturate(1.05)",
        zIndex: 1500,
        position: "sticky",
        top: 0,
        overflow: "hidden",
      }}
    >
      <div aria-hidden="true" className="brand-header__base" />
      <div aria-hidden="true" className="brand-header__mantle" />
      <div aria-hidden="true" className="brand-header__bloom" />

      <div aria-hidden="true" className="particles" />

      <div className="container-fluid d-flex h-100 items-center justify-center px-0">
        <div className="row h-100 w-100 items-center justify-content-center justify-content-xl-between">
          <div
            className="col-12 col-xl-4 d-flex h-100 items-center justify-content-center justify-content-xl-start"
            data-scroll-brand
          >
            <MarcaImage title={title} src={coverImage} />
          </div>

          <div className="col-8 d-none h-100 items-center justify-content-end d-xl-flex">
            <ul className="brand-nav-list navbar-nav mb-2 mt-2 mb-lg-0">
              {navItems.map((item) => {
                const isActive = pathname === item.link;
                const isBooking = item.name === "AGENDE AGORA";

                return (
                  <li
                    className="nav-item mx-3"
                    data-scroll-nav-item
                    key={item.name}
                  >
                    <Link
                      aria-current={isActive ? "page" : undefined}
                      className={`nav-link brand-nav-link ${
                        isActive ? "brand-nav-link--active" : ""
                      } ${isBooking ? "highlight-agenda" : ""}`}
                      href={item.link}
                      prefetch={false}
                      rel={isBooking ? "noreferrer" : undefined}
                      style={{
                        fontFamily: "'Novecento', sans-serif",
                        fontSize: isBooking ? "0.77rem" : "0.7rem",
                        letterSpacing: "0.4em",
                        transition: "color 0.3s ease, letter-spacing 0.4s ease",
                        whiteSpace: "nowrap",
                      }}
                      target={isBooking ? "_blank" : undefined}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
