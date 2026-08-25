"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ReactNode } from "react";
import { useRef } from "react";

type Props = {
  children: ReactNode;
};

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export function ScrollExperience({ children }: Readonly<Props>) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;

      const media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 1200px)",
          motionAllowed: "(prefers-reduced-motion: no-preference)",
          reducedMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { desktop, reducedMotion } = context.conditions ?? {};
          if (reducedMotion) return;

          gsap.fromTo(
            "[data-scroll-signature-bg]",
            { x: () => window.innerWidth * -0.04 },
            {
              ease: "none",
              scrollTrigger: {
                end: "bottom top",
                invalidateOnRefresh: true,
                scrub: 0.4,
                start: "top bottom",
                trigger: "[data-scroll-signature]",
              },
              x: () => window.innerWidth * 0.04,
            },
          );

          gsap.from("[data-scroll-signature-reveal]", {
            autoAlpha: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: {
              once: true,
              start: "top 82%",
              trigger: "[data-scroll-signature-foreground]",
            },
            y: desktop ? 28 : 18,
          });

          const instagram = root.current?.querySelector<HTMLElement>(
            "[data-scroll-instagram]",
          );

          if (instagram) {
            const instagramCopy = instagram.querySelector<HTMLElement>(
              "[data-scroll-instagram-copy]",
            );
            const instagramCards = gsap.utils.toArray<HTMLElement>(
              "[data-scroll-instagram-card]",
              instagram,
            );

            gsap.fromTo(
              instagramCopy,
              { autoAlpha: 0, y: desktop ? 34 : 22 },
              {
                autoAlpha: 1,
                duration: 0.72,
                ease: "power3.out",
                scrollTrigger: {
                  once: true,
                  start: "top 84%",
                  trigger: instagram,
                },
                y: 0,
              },
            );

            gsap.fromTo(
              instagramCards,
              {
                autoAlpha: 0,
                clipPath: "inset(18% 12% 12% 12% round 0.35rem)",
              },
              {
                autoAlpha: 1,
                clipPath: "inset(0% 0% 0% 0% round 0.35rem)",
                duration: 0.78,
                ease: "power3.out",
                stagger: 0.08,
                scrollTrigger: {
                  once: true,
                  start: "top 78%",
                  trigger: instagram,
                },
              },
            );
          }

          const footer = root.current?.querySelector<HTMLElement>(
            "[data-scroll-footer]",
          );

          if (!footer) return;

          const footerIdentity = footer.querySelector<HTMLElement>(
            "[data-scroll-footer-identity]",
          );
          const footerCopy = footer.querySelector<HTMLElement>(
            "[data-scroll-footer-copy]",
          );
          const footerMetrics = gsap.utils.toArray<HTMLElement>(
            ".cabraiz-credit__metric",
            footer,
          );
          const footerCta = footer.querySelector<HTMLElement>(
            "[data-scroll-footer-cta]",
          );
          const footerSignature = footer.querySelector<HTMLElement>(
            "[data-scroll-footer-signature]",
          );
          const footerGlow = footer.querySelector<HTMLElement>(
            "[data-scroll-footer-glow]",
          );

          const footerReveal = gsap.timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: {
              end: () => {
                const footerHeight = footer.offsetHeight;
                const finishBuffer = Math.min(18, footerHeight * 0.08);
                const finishLine =
                  ((window.innerHeight - footerHeight + finishBuffer) /
                    window.innerHeight) *
                  100;

                return `top ${gsap.utils.clamp(0, 94, finishLine)}%`;
              },
              invalidateOnRefresh: true,
              scrub: 0.65,
              start: "top 96%",
              trigger: footer,
            },
          });

          footerReveal
            .fromTo(
              footer,
              {
                clipPath: "inset(0 0 16% 0 round 1.4rem)",
                filter: "saturate(0.72) brightness(0.78)",
              },
              {
                clipPath: "inset(0 0 0% 0 round 0rem)",
                filter: "saturate(1) brightness(1)",
              },
              0,
            )
            .fromTo(
              footerGlow,
              { autoAlpha: 0, scale: 0.62 },
              { autoAlpha: 1, scale: 1, duration: 0.92 },
              0,
            )
            .fromTo(
              footerIdentity,
              { autoAlpha: 0, force3D: true, x: desktop ? -82 : -46 },
              { autoAlpha: 1, duration: 0.68, force3D: true, x: 0 },
              0.08,
            )
            .fromTo(
              footerCopy,
              { autoAlpha: 0, force3D: true, y: 26 },
              { autoAlpha: 1, duration: 0.6, force3D: true, y: 0 },
              0.2,
            )
            .fromTo(
              footerMetrics,
              { autoAlpha: 0, force3D: true, y: 12 },
              {
                autoAlpha: 1,
                duration: 0.42,
                force3D: true,
                stagger: 0.045,
                y: 0,
              },
              0.28,
            )
            .fromTo(
              footerCta,
              {
                autoAlpha: 0,
                force3D: true,
                scale: 0.96,
                x: desktop ? 76 : 0,
                y: desktop ? 0 : 22,
              },
              {
                autoAlpha: 1,
                duration: 0.64,
                force3D: true,
                scale: 1,
                x: 0,
                y: 0,
              },
              0.3,
            )
            .fromTo(
              footerSignature,
              { autoAlpha: 0, force3D: true, y: 14 },
              { autoAlpha: 1, duration: 0.42, force3D: true, y: 0 },
              0.48,
            );
        },
      );

      document.fonts.ready.then(() => ScrollTrigger.refresh());

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <main ref={root} className="flex min-h-screen flex-col justify-start">
      {children}
    </main>
  );
}
