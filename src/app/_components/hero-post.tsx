"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef, useState } from "react";
import { OrnamentalFrame } from "./ornamental-frame";

type Props = {
  salonImage: string;
  portraitImages: readonly string[];
};

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export function HeroPost({ salonImage, portraitImages }: Readonly<Props>) {
  const hero = useRef<HTMLElement>(null);
  const [isSalonLoaded, setIsSalonLoaded] = useState(false);
  const [isPortraitLoaded, setIsPortraitLoaded] = useState(false);
  const isReady = isSalonLoaded && isPortraitLoaded;

  useGSAP(
    () => {
      if (!hero.current) return;

      const media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 1200px)",
          motionAllowed: "(prefers-reduced-motion: no-preference)",
          reducedMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const desktop = Boolean(context.conditions?.desktop);
          const reducedMotion = Boolean(context.conditions?.reducedMotion);

          if (reducedMotion) {
            gsap.set("[data-hero-prelude]", { autoAlpha: 0 });
            gsap.set("[data-scroll-hero-cue]", { autoAlpha: 0 });
            gsap.set(".hero-first-mask", { overflow: "visible" });
            return;
          }

          gsap.set("[data-hero-copy-line], [data-hero-tagline-item]", {
            autoAlpha: 0,
          });
          gsap.set("[data-hero-signature-stroke]", {
            strokeDasharray: 1,
            strokeDashoffset: 1,
          });
          gsap.set("[data-hero-tagline-ornament]", {
            autoAlpha: 0,
            clipPath: "inset(0 50% 0 50%)",
          });
          gsap.set(
            "[data-hero-portrait-frame]:not([data-portrait-frame='0'])",
            {
              autoAlpha: 0,
            },
          );

          const reveal = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              end: "bottom bottom",
              invalidateOnRefresh: true,
              scrub: desktop ? 0.75 : 0.45,
              start: "top top",
              trigger: hero.current,
            },
          });

          reveal
            .fromTo(
              "[data-scroll-hero-atmosphere]",
              { scale: 1.18, yPercent: -4 },
              { duration: 1, scale: 1.04, yPercent: 4 },
              0,
            )
            .fromTo(
              "[data-scroll-hero-composition]",
              { autoAlpha: 0.7 },
              {
                autoAlpha: 1,
                duration: 0.7,
                ease: "power2.out",
              },
              0,
            )
            .fromTo(
              "[data-hero-prelude]",
              { autoAlpha: 1, y: 0 },
              {
                autoAlpha: 0,
                duration: 0.26,
                ease: "power2.in",
                y: desktop ? -36 : -22,
              },
              0,
            )
            .fromTo(
              "[data-hero-salon]",
              { autoAlpha: 0.2, scale: 1.14, xPercent: 8 },
              {
                autoAlpha: 1,
                duration: 0.78,
                ease: "power2.out",
                scale: 1.02,
                xPercent: 0,
              },
              0.04,
            )
            .fromTo(
              "[data-hero-rings]",
              { autoAlpha: 0, rotation: -16, scale: 0.72 },
              {
                autoAlpha: 1,
                duration: 0.64,
                ease: "power3.out",
                rotation: 0,
                scale: 1,
              },
              0.15,
            )
            .fromTo(
              "[data-hero-waves]",
              { autoAlpha: 0, xPercent: -4, yPercent: 6 },
              {
                autoAlpha: 1,
                duration: 1,
                ease: "none",
                xPercent: 2,
                yPercent: 0,
              },
              0,
            )
            .fromTo(
              "[data-hero-portrait]",
              {
                autoAlpha: 0,
                scale: desktop ? 1.08 : 1.04,
                xPercent: desktop ? 18 : 12,
                yPercent: 7,
              },
              {
                autoAlpha: 1,
                duration: 0.66,
                ease: "power3.out",
                scale: 1,
                xPercent: 0,
                yPercent: 0,
              },
              0.2,
            )
            .to(
              "[data-portrait-frame='1']",
              {
                autoAlpha: 1,
                duration: 0.14,
                ease: "power1.inOut",
                scale: 1,
                xPercent: 0,
              },
              0.48,
            )
            .to(
              "[data-portrait-frame='0']",
              {
                autoAlpha: 0,
                duration: 0.06,
                ease: "power1.inOut",
                scale: 1.015,
                xPercent: -1.5,
              },
              0.61,
            )
            .to(
              "[data-portrait-frame='2']",
              {
                autoAlpha: 1,
                duration: 0.14,
                ease: "power1.inOut",
                scale: 1,
                xPercent: 0,
              },
              0.7,
            )
            .to(
              "[data-portrait-frame='1']",
              {
                autoAlpha: 0,
                duration: 0.06,
                ease: "power1.inOut",
                scale: 1.015,
                xPercent: -1.5,
              },
              0.83,
            )
            .fromTo(
              "[data-hero-copy-line]",
              { autoAlpha: 0, yPercent: 115 },
              {
                autoAlpha: 1,
                duration: 0.42,
                ease: "power3.out",
                stagger: 0.065,
                yPercent: 0,
              },
              0.22,
            )
            .set(".hero-first-mask", { overflow: "visible" }, 0.72)
            .to(
              "[data-hero-signature-stroke]",
              {
                duration: 0.38,
                ease: "power2.out",
                stagger: 0.035,
                strokeDashoffset: 0,
              },
              0.38,
            )
            .fromTo(
              "[data-hero-tagline-item]",
              { autoAlpha: 0, y: 14 },
              {
                autoAlpha: 1,
                duration: 0.3,
                ease: "power2.out",
                stagger: 0.045,
                y: 0,
              },
              0.43,
            )
            .to(
              "[data-hero-tagline-ornament]",
              {
                autoAlpha: 1,
                clipPath: "inset(0 0% 0 0%)",
                duration: 0.38,
                ease: "power2.out",
              },
              0.56,
            )
            .fromTo(
              "[data-scroll-hero-sheen]",
              { xPercent: -170 },
              {
                duration: 0.38,
                ease: "power2.inOut",
                xPercent: 300,
              },
              0.5,
            )
            .fromTo(
              "[data-scroll-hero-cue]",
              { autoAlpha: 1, y: 0 },
              { autoAlpha: 0, duration: 0.2, y: -14 },
              0,
            );
        },
      );

      document.fonts.ready.then(() => ScrollTrigger.refresh());

      return () => media.revert();
    },
    { scope: hero },
  );

  return (
    <section
      aria-busy={!isReady}
      aria-label="Apresentação Francy Araújo"
      className="hero-story relative h-[170svh] min-h-[900px] overflow-clip bg-[#1c120e]"
      data-scroll-hero
      ref={hero}
    >
      <div className="hero-stage sticky flex items-center overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -inset-[8%] opacity-45"
          data-scroll-hero-atmosphere
        >
          <Image
            alt=""
            className="object-cover blur-[34px] saturate-75"
            fill
            priority
            sizes="110vw"
            src={salonImage}
          />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 70% 46%, rgba(189, 119, 70, 0.2), transparent 36%), linear-gradient(180deg, rgba(21, 13, 10, 0.56), rgba(28, 18, 14, 0.88))",
          }}
        />

        <article
          className="hero-composition relative z-10 w-full overflow-hidden bg-[#f7f1e8]"
          data-scroll-hero-composition
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,#fffaf4_0%,#f7f1e8_47%,#ead8c3_100%)]" />

          <div
            className="hero-salon-layer absolute overflow-hidden"
            data-hero-salon
            style={{ opacity: isSalonLoaded ? 1 : 0 }}
          >
            <Image
              alt=""
              className="object-cover"
              fill
              onError={() => setIsSalonLoaded(true)}
              onLoad={() => setIsSalonLoaded(true)}
              priority
              sizes="(min-width: 768px) 62vw, 100vw"
              src={salonImage}
            />
            <div
              aria-hidden="true"
              className="hero-salon-fade absolute inset-0"
            />
          </div>

          <div
            aria-hidden="true"
            className="hero-rings absolute"
            data-hero-rings
          >
            <span className="absolute inset-[5%] rounded-full border border-[#bd8951]/65" />
            <span className="absolute inset-[12%] rounded-full border border-[#d6b185]/50" />
            <span className="absolute right-[8%] top-[48%] h-2.5 w-2.5 rotate-45 bg-[#b77e43] shadow-[0_0_20px_rgba(183,126,67,0.65)]" />
          </div>

          <div
            aria-hidden="true"
            className="hero-waves absolute"
            data-hero-waves
          >
            <svg
              focusable="false"
              preserveAspectRatio="none"
              viewBox="0 0 800 320"
            >
              <title>Ondas decorativas</title>
              <path
                d="M0 40 C92 55 132 196 282 218 C414 238 515 164 646 183 C719 194 765 228 800 255 L800 320 L0 320 Z"
                fill="#d2b89f"
                opacity="0.14"
              />
              <path
                d="M0 100 C104 112 153 232 315 250 C446 265 547 202 681 220 C738 228 777 250 800 270 L800 320 L0 320 Z"
                fill="#ddc7b3"
                opacity="0.22"
              />
              <path
                d="M0 168 C120 174 188 264 350 281 C492 296 589 248 710 258 C752 261 782 274 800 286 L800 320 L0 320 Z"
                fill="#ead9ca"
                opacity="0.38"
              />
            </svg>
          </div>

          <OrnamentalFrame />

          <div className="hero-prelude absolute z-30" data-hero-prelude>
            <div className="hero-prelude-kicker flex items-center gap-3 text-[#765c49]">
              <span>01</span>
              <span aria-hidden="true" className="h-px w-12 bg-[#9d5960]/65" />
              <span>O COMEÇO</span>
            </div>
            <h2 className="hero-prelude-title mt-5 text-[#352a25]">
              Toda beleza
              <span className="block">começa com</span>
              <span className="block text-[#7b2028]">um ritual.</span>
            </h2>
            <p className="hero-prelude-copy mt-6 max-w-md text-[#69574b]">
              Cuidado, técnica e identidade antes mesmo do espelho revelar.
            </p>
          </div>

          <div
            className="hero-portrait absolute"
            data-hero-portrait
            style={{ opacity: isPortraitLoaded ? 1 : 0 }}
          >
            {portraitImages.map((portraitImage, index) => (
              <Image
                alt={
                  index === 0
                    ? "Mulher com cabelos ruivos em penteado trançado"
                    : ""
                }
                className="hero-portrait-frame object-contain object-bottom"
                data-hero-portrait-frame
                data-portrait-frame={index}
                fill
                key={portraitImage}
                onError={
                  index === 0 ? () => setIsPortraitLoaded(true) : undefined
                }
                onLoad={
                  index === 0 ? () => setIsPortraitLoaded(true) : undefined
                }
                priority={index === 0}
                sizes="(min-width: 768px) 58vw, 100vw"
                src={portraitImage}
              />
            ))}
          </div>

          <div className="hero-copy absolute z-40">
            <h1 aria-label="Francy Araújo" className="m-0">
              <span className="hero-first-mask block overflow-hidden">
                <span
                  className="hero-name-first block text-[#7b2028]"
                  data-hero-copy-line
                >
                  Francy
                </span>
              </span>
              <span className="hero-signature-mask block overflow-hidden">
                <span
                  className="hero-name-signature block text-[#2d2723]"
                  data-hero-copy-line
                >
                  <span className="hero-signature-lockup">
                    <span className="hero-signature-word">
                      Ara<span className="hero-accented-u">u</span>jo
                    </span>
                    <svg
                      aria-hidden="true"
                      className="hero-signature-flourish"
                      focusable="false"
                      viewBox="0 0 340 70"
                    >
                      <path
                        d="M7 38 C20 44 34 39 48 35 C66 30 84 32 101 35 C111 37 120 36 129 33"
                        data-hero-signature-stroke
                        pathLength="1"
                      />
                      <path
                        d="M207 32 C220 35 233 35 246 33"
                        data-hero-signature-stroke
                        pathLength="1"
                      />
                      <path
                        d="M246 33 C242 28 243 22 248 21 C253 20 256 24 257 29 C259 24 263 21 268 22 C273 24 273 29 270 33 C267 38 262 42 257 46 C252 42 248 38 246 33"
                        data-hero-signature-stroke
                        pathLength="1"
                      />
                      <path
                        d="M270 33 C289 35 314 35 339 32"
                        data-hero-signature-stroke
                        pathLength="1"
                      />
                    </svg>
                  </span>
                </span>
              </span>
            </h1>

            <p className="hero-tagline flex flex-wrap items-center text-[#4f4136]">
              <span data-hero-tagline-item>BELEZA</span>
              <span aria-hidden="true" data-hero-tagline-item>
                •
              </span>
              <span data-hero-tagline-item>ESTILO</span>
              <span aria-hidden="true" data-hero-tagline-item>
                •
              </span>
              <span data-hero-tagline-item>CONFIANÇA</span>
            </p>

            <div
              aria-hidden="true"
              className="hero-tagline-ornament"
              data-hero-tagline-ornament
            >
              <Image
                alt=""
                className="block h-auto w-full"
                height={107}
                sizes="(min-width: 768px) 320px, 272px"
                src="/assets/blog/dynamic-routing/tagline-ornament-generated.png"
                width={1991}
              />
            </div>
          </div>

          <div
            aria-hidden="true"
            className="absolute -inset-y-1/2 left-[-16%] z-20 w-[12%] rotate-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.48),transparent)] blur-sm"
            data-scroll-hero-sheen
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-50 border-y border-[#c89b68]/35"
          />
        </article>

        <div
          aria-hidden="true"
          className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 text-[#ead7c0] md:bottom-20"
          data-scroll-hero-cue
        >
          <span className="whitespace-nowrap text-[10px] tracking-[0.38em] md:text-xs">
            ROLE PARA REVELAR
          </span>
          <span className="h-12 w-px bg-linear-to-b from-[#c9955b] to-transparent" />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-20 h-28 bg-linear-to-b from-transparent to-[#1c120e]/70"
        />
      </div>
    </section>
  );
}
