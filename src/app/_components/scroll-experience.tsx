"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ReactNode } from "react";
import { useRef } from "react";

type Props = {
  children: ReactNode;
};

const showDevelopmentProgress = process.env.NODE_ENV === "development";

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
          if (showDevelopmentProgress) {
            const progress = "[data-scroll-progress]";

            gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });

            if (reducedMotion) {
              gsap.set(progress, { scaleX: 1 });
            } else {
              gsap.to(progress, {
                ease: "none",
                scaleX: 1,
                scrollTrigger: {
                  end: "bottom bottom",
                  scrub: 0.15,
                  start: "top top",
                  trigger: root.current,
                },
              });
            }
          }

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
        },
      );

      document.fonts.ready.then(() => ScrollTrigger.refresh());

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <main ref={root} className="flex min-h-screen flex-col justify-start">
      {showDevelopmentProgress ? (
        <div
          aria-hidden="true"
          className="scroll-progress"
          data-scroll-progress
        />
      ) : null}
      {children}
    </main>
  );
}
