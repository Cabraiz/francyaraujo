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

const navItems = [
  { name: "HOME", link: "/" },
  { name: "HISTÓRIA", link: "/story" },
  { name: "SERVIÇOS", link: "/services" },
  { name: "AGENDE AGORA", link: "/book" },
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
      className="navbar navbar-expand-lg navbar-light fade-in py-0"
      data-scroll-intro
      ref={navigation}
      style={{
        height: "var(--site-header-height)",
        transition: "height 0.5s ease-in-out",
        background: "rgba(247, 242, 236, 0.94)",
        backdropFilter: "blur(18px) saturate(1.05)",
        WebkitBackdropFilter: "blur(18px) saturate(1.05)",
        border: "1px solid rgba(180, 132, 77, 0.22)",
        boxShadow: "0 5px 24px rgba(72, 48, 34, 0.12)",
        zIndex: 1500,
        position: "sticky",
        top: 0,
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: isDesktop
            ? "linear-gradient(90deg, rgba(247, 242, 236, 0.96) 0%, rgba(247, 242, 236, 0.92) 32%, rgba(243, 233, 222, 0.9) 100%)"
            : "linear-gradient(90deg, rgba(247, 242, 236, 0.96) 0%, rgba(245, 237, 228, 0.92) 100%)",
          zIndex: -1,
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(115deg, rgba(255, 255, 255, 0.58), rgba(255, 255, 255, 0) 42%, rgba(184, 137, 82, 0.06))",
          opacity: 0.75,
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          height: "70%",
          background: "rgba(255, 255, 255, 0.16)",
          borderRadius: "50%",
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />

      <div aria-hidden="true" className="particles" />

      <div className="container-fluid d-flex h-100 items-center justify-center px-0">
        <div
          className={`row h-100 w-100 items-center ${
            isDesktop ? "justify-content-between" : "justify-content-center"
          }`}
        >
          <div
            className={`col-${isDesktop ? "4" : "12"} d-flex h-100 items-center justify-content-${
              isDesktop ? "start" : "center"
            }`}
            data-scroll-brand
          >
            <MarcaImage title={title} src={coverImage} />
          </div>

          {isDesktop && (
            <div className="col-8 d-flex h-100 items-center justify-content-end">
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
                        style={{
                          fontFamily: "'Novecento', sans-serif",
                          fontSize: isBooking ? "1.1em" : "inherit",
                          letterSpacing: "0.4em",
                          transition:
                            "color 0.3s ease, letter-spacing 0.4s ease",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
