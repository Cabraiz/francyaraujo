"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef, useState } from "react";
import { OrnamentalFrame } from "./ornamental-frame";

type Props = {
  sceneImages: readonly [string, ...string[]];
};

const whatsappNumber = "558881902582";
const whatsappMessage = encodeURIComponent(
  "Olá, Francy! Gostaria de agendar um horário.",
);

const diagonalClipHidden = "polygon(0 0, -12% 0, -32% 100%, 0 100%)";
const diagonalClipVisible = "polygon(0 0, 132% 0, 112% 100%, 0 100%)";
const sceneTransitionDuration = 0.1;

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export function HeroPost({ sceneImages }: Readonly<Props>) {
  const hero = useRef<HTMLElement>(null);
  const [isSceneLoaded, setIsSceneLoaded] = useState(false);

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
          const frameScale = desktop ? 1 : 1.28;
          const sceneFrames = gsap.utils.toArray<HTMLElement>(
            "[data-hero-scene-frame]",
            hero.current,
          );
          const transitionBeam = hero.current?.querySelector<HTMLElement>(
            "[data-hero-transition-beam]",
          );

          if (reducedMotion) {
            gsap.set("[data-hero-prelude]", { autoAlpha: 0 });
            gsap.set("[data-scroll-hero-cue]", { autoAlpha: 0 });
            gsap.set(".hero-first-mask", { overflow: "visible" });
            gsap.set(sceneFrames, { autoAlpha: 0 });
            gsap.set(sceneFrames.at(-1) ?? [], {
              autoAlpha: 1,
              clipPath: diagonalClipVisible,
              scale: frameScale,
              yPercent: 5,
            });
            gsap.set(transitionBeam ?? [], { autoAlpha: 0 });
            return;
          }

          gsap.set(
            "[data-hero-copy-line], [data-hero-tagline-item], [data-hero-cta]",
            {
              autoAlpha: 0,
            },
          );
          gsap.set("[data-hero-signature-stroke]", {
            strokeDasharray: 1,
            strokeDashoffset: 1,
          });
          gsap.set("[data-hero-tagline-ornament]", {
            autoAlpha: 0,
            clipPath: "inset(0 50% 0 50%)",
          });
          gsap.set("[data-hero-scene-frame]", {
            transformOrigin: "50% 50%",
          });
          gsap.set(transitionBeam ?? [], {
            autoAlpha: 0,
            xPercent: -180,
          });
          sceneFrames.forEach((frame, index) => {
            gsap.set(frame, {
              autoAlpha: index === 0 ? 1 : 0,
              clipPath: index === 0 ? diagonalClipVisible : diagonalClipHidden,
              scale: frameScale,
              xPercent: index === 0 ? 0 : 0.7 + index * 0.45,
              yPercent: 5,
            });
          });

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
            );

          sceneFrames.slice(1).forEach((frame, index) => {
            const transitionStart = 0.3 + index * 0.12;
            const previousFrame = sceneFrames[index];

            reveal
              .set(frame, { autoAlpha: 1 }, transitionStart)
              .set(
                transitionBeam ?? [],
                { autoAlpha: 1, xPercent: -180 },
                transitionStart,
              )
              .to(
                frame,
                {
                  clipPath: diagonalClipVisible,
                  duration: sceneTransitionDuration,
                  ease: "none",
                  xPercent: 0,
                },
                transitionStart,
              )
              .to(
                transitionBeam ?? [],
                {
                  duration: sceneTransitionDuration,
                  ease: "none",
                  xPercent: 3800,
                },
                transitionStart,
              )
              .set(
                previousFrame ?? [],
                { autoAlpha: 0 },
                transitionStart + sceneTransitionDuration,
              )
              .set(
                transitionBeam ?? [],
                { autoAlpha: 0 },
                transitionStart + sceneTransitionDuration,
              );
          });

          reveal
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
              "[data-hero-cta]",
              { autoAlpha: 0, y: 12 },
              {
                autoAlpha: 1,
                duration: 0.32,
                ease: "power2.out",
                y: 0,
              },
              0.62,
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
      aria-busy={!isSceneLoaded}
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
            src={sceneImages[0]}
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
            aria-hidden="true"
            className="hero-sheen"
            data-hero-transition-beam
          />

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
            <div className="hero-prelude-copy-lockup mt-6">
              <p className="hero-prelude-copy text-[#69574b]">
                Cuidado, técnica e identidade antes mesmo do espelho revelar.
              </p>
            </div>
          </div>

          <div
            className="hero-scene-sequence absolute"
            data-hero-sequence
            style={{ opacity: isSceneLoaded ? 1 : 0 }}
          >
            {sceneImages.map((sceneImage, index) => (
              <Image
                alt={
                  index === 0
                    ? "Mulher adulta iniciando uma transformação profissional dos cabelos pretos ao ruivo"
                    : ""
                }
                className="hero-sequence-frame object-cover"
                data-hero-scene-frame
                data-scene-frame={index}
                fill
                key={sceneImage}
                onError={index === 0 ? () => setIsSceneLoaded(true) : undefined}
                onLoad={index === 0 ? () => setIsSceneLoaded(true) : undefined}
                priority={index === 0}
                sizes="100vw"
                src={sceneImage}
              />
            ))}
            <div
              aria-hidden="true"
              className="hero-sequence-fade absolute inset-0"
            />
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
                    <svg
                      aria-hidden="true"
                      className="hero-signature-flourish"
                      focusable="false"
                      viewBox="0 0 60 70"
                    >
                      <path
                        d="M3 38 C18 40 36 37 57 33"
                        data-hero-signature-stroke
                        pathLength="1"
                      />
                    </svg>

                    <span className="hero-signature-word">
                      Ara<span className="hero-accented-u">u</span>jo
                      <svg
                        aria-hidden="true"
                        className="hero-signature-heart-tail"
                        focusable="false"
                        viewBox="0 0 118 70"
                      >
                        <path
                          d="M1 33 C4 34 7 34 10 33"
                          data-hero-signature-stroke
                          pathLength="1"
                        />
                        <path
                          d="M10 33 C7 28 8 23 13 22 C18 21 21 25 22 29 C24 25 28 22 33 23 C38 25 38 30 35 34 C32 39 27 43 22 47 C17 43 12 39 10 33"
                          data-hero-signature-stroke
                          pathLength="1"
                        />
                        <path
                          d="M35 34 C57 36 84 35 117 32"
                          data-hero-signature-stroke
                          pathLength="1"
                        />
                      </svg>
                    </span>
                  </span>
                </span>
              </span>
            </h1>

            <p className="hero-tagline flex items-center text-[#4f4136]">
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

            <div className="hero-cta" data-hero-cta>
              <div className="hero-cta__actions">
                <a
                  className="hero-cta__primary"
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  AGENDAR HORÁRIO
                  <span aria-hidden="true">✦</span>
                </a>
              </div>
            </div>
          </div>

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
