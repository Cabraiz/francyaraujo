"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type Props = {
  children: ReactNode;
};

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export function ScrollExperience({ children }: Readonly<Props>) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = root.current?.querySelector<HTMLElement>(
      "[data-scroll-footer]",
    );
    const siteChoice = footer?.querySelector<HTMLAnchorElement>(
      ".cabraiz-credit__speech-balloon a:first-child",
    );

    if (!footer || !siteChoice) return;

    let pointerX = 0;
    let frame = 0;

    const getLayoutLeft = (element: HTMLElement) => {
      let left = 0;
      let current: HTMLElement | null = element;

      while (current) {
        left += current.offsetLeft;
        current = current.offsetParent as HTMLElement | null;
      }

      return left - window.scrollX;
    };

    const updateNearestChoice = () => {
      frame = 0;
      const siteRight = getLayoutLeft(siteChoice) + siteChoice.offsetWidth;
      const nearestChoice = pointerX < siteRight ? "site" : "whatsapp";

      if (footer.dataset.nearestAction !== nearestChoice) {
        footer.dataset.nearestAction = nearestChoice;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      pointerX = event.clientX;
      if (!frame) frame = window.requestAnimationFrame(updateNearestChoice);
    };

    const clearNearestChoice = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      delete footer.dataset.nearestAction;
    };

    footer.addEventListener("pointermove", handlePointerMove);
    footer.addEventListener("pointerleave", clearNearestChoice);

    return () => {
      clearNearestChoice();
      footer.removeEventListener("pointermove", handlePointerMove);
      footer.removeEventListener("pointerleave", clearNearestChoice);
    };
  }, []);

  useGSAP(
    () => {
      if (!root.current) return;
      const scrollRoot = root.current;

      const media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 1200px)",
          mobile: "(max-width: 767px)",
          pinnedGallery: "(min-width: 768px)",
          signatureVisible: "(min-width: 768px)",
          motionAllowed: "(prefers-reduced-motion: no-preference)",
          reducedMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const {
            desktop,
            mobile,
            pinnedGallery,
            reducedMotion,
            signatureVisible,
          } = context.conditions ?? {};

          const instagram = scrollRoot.querySelector<HTMLElement>(
            "[data-scroll-instagram]",
          );
          const instagramFlips =
            instagram && !mobile
              ? gsap.utils.toArray<HTMLElement>(
                  "[data-scroll-instagram-flip]",
                  instagram,
                )
              : [];

          if (reducedMotion) {
            gsap.set(instagramFlips, { rotationY: 180 });
            return;
          }

          const signature = scrollRoot.querySelector<HTMLElement>(
            "[data-scroll-signature]",
          );

          if (signature && signatureVisible) {
            const signatureBackground = signature.querySelector<HTMLElement>(
              "[data-scroll-signature-bg]",
            );
            const signatureArchitecture = signature.querySelector<HTMLElement>(
              "[data-scroll-signature-architecture]",
            );
            const signatureTable = signature.querySelector<HTMLElement>(
              "[data-scroll-signature-table]",
            );
            const signatureVase = signature.querySelector<HTMLElement>(
              "[data-scroll-signature-vase]",
            );
            const signatureChair = signature.querySelector<HTMLElement>(
              "[data-scroll-signature-chair]",
            );
            const signaturePanel = signature.querySelector<HTMLElement>(
              "[data-scroll-signature-panel]",
            );
            const signatureReveal = gsap.utils.toArray<HTMLElement>(
              "[data-scroll-signature-reveal]",
              signature,
            );

            const signatureTimeline = gsap.timeline({
              defaults: { ease: "power2.out" },
              scrollTrigger: {
                end: "top 28%",
                invalidateOnRefresh: true,
                refreshPriority: -1,
                scrub: 0.72,
                start: "top 92%",
                trigger: signature,
              },
            });

            signatureTimeline
              .fromTo(
                signatureArchitecture,
                { force3D: true, scale: 1.08, xPercent: -3 },
                { force3D: true, scale: 1, xPercent: 0 },
                0,
              )
              .fromTo(
                signaturePanel,
                {
                  autoAlpha: 0.7,
                  clipPath: "inset(0 8% 0 8%)",
                  force3D: true,
                  y: 18,
                },
                {
                  autoAlpha: 1,
                  clipPath: "inset(0 0% 0 0%)",
                  force3D: true,
                  y: 0,
                },
                0.04,
              )
              .fromTo(
                signatureTable,
                {
                  autoAlpha: 0.35,
                  force3D: true,
                  rotation: -3,
                  x: -18,
                  y: 26,
                },
                {
                  autoAlpha: 1,
                  force3D: true,
                  rotation: 0,
                  x: 0,
                  y: 0,
                },
                0.08,
              )
              .fromTo(
                signatureVase,
                {
                  autoAlpha: 0.22,
                  force3D: true,
                  rotation: -4,
                  x: -14,
                  y: 42,
                },
                {
                  autoAlpha: 1,
                  force3D: true,
                  rotation: 0,
                  x: 0,
                  y: 0,
                },
                0.14,
              )
              .fromTo(
                signatureChair,
                {
                  autoAlpha: 0.28,
                  force3D: true,
                  rotation: 2,
                  scale: 0.91,
                  x: 26,
                  y: 32,
                },
                {
                  autoAlpha: 1,
                  force3D: true,
                  rotation: 0,
                  scale: 1,
                  x: 0,
                  y: 0,
                },
                0.18,
              )
              .fromTo(
                signatureReveal,
                { autoAlpha: 0, force3D: true, y: desktop ? 24 : 16 },
                {
                  autoAlpha: 1,
                  force3D: true,
                  stagger: 0.07,
                  y: 0,
                },
                0.2,
              );

            gsap.fromTo(
              signatureBackground,
              { x: () => window.innerWidth * -0.035 },
              {
                ease: "none",
                scrollTrigger: {
                  end: "bottom top",
                  invalidateOnRefresh: true,
                  refreshPriority: -1,
                  scrub: 0.4,
                  start: "top bottom",
                  trigger: signature,
                },
                x: () => window.innerWidth * 0.035,
              },
            );
          }

          const mobileTransition = scrollRoot.querySelector<HTMLElement>(
            "[data-scroll-mobile-portfolio-transition]",
          );

          if (mobileTransition && mobile) {
            const transitionPanel = mobileTransition.querySelector<HTMLElement>(
              "[data-mobile-transition-panel]",
            );
            const transitionBotanical =
              mobileTransition.querySelector<HTMLElement>(
                "[data-mobile-transition-botanical]",
              );
            const transitionTitleLines = gsap.utils.toArray<HTMLElement>(
              "[data-mobile-transition-title-line]",
              mobileTransition,
            );
            const transitionDivider =
              mobileTransition.querySelector<HTMLElement>(
                "[data-mobile-transition-divider]",
              );
            const transitionTagline =
              mobileTransition.querySelector<HTMLElement>(
                "[data-mobile-transition-tagline]",
              );
            const transitionSparkle =
              mobileTransition.querySelector<HTMLElement>(
                "[data-mobile-transition-sparkle]",
              );
            const transitionCurve = mobileTransition.querySelector<HTMLElement>(
              "[data-mobile-transition-curve]",
            );
            const transitionScrollLink =
              mobileTransition.querySelector<HTMLElement>(
                "[data-mobile-transition-scroll-link]",
              );
            const mobileTransitionSpeed = 2;
            const mobileTransitionScrollDistance = () =>
              (mobileTransition.offsetHeight + window.innerHeight * 0.92) /
              mobileTransitionSpeed;

            const mobileTransitionTimeline = gsap.timeline({
              defaults: { ease: "power3.out" },
              scrollTrigger: {
                end: () => `+=${mobileTransitionScrollDistance()}`,
                invalidateOnRefresh: true,
                scrub: 0.85 / mobileTransitionSpeed,
                start: "top 92%",
                trigger: mobileTransition,
              },
            });

            mobileTransitionTimeline
              .fromTo(
                transitionPanel,
                {
                  autoAlpha: 0.72,
                  clipPath: "inset(14% 3% 0 3% round 48% 48% 0 0)",
                  scale: 0.97,
                  yPercent: 18,
                },
                {
                  autoAlpha: 1,
                  clipPath: "inset(0% 0% 0% 0% round 0% 0% 0% 0%)",
                  duration: 0.9,
                  scale: 1,
                  yPercent: 0,
                },
                0,
              )
              .fromTo(
                transitionBotanical,
                {
                  autoAlpha: 0,
                  clipPath: "inset(0 50% 0 50%)",
                  rotation: -8,
                  scale: 0.72,
                },
                {
                  autoAlpha: 1,
                  clipPath: "inset(0 0% 0 0%)",
                  duration: 0.64,
                  rotation: 0,
                  scale: 1,
                },
                0.08,
              )
              .fromTo(
                transitionTitleLines,
                {
                  autoAlpha: 0,
                  clipPath: "inset(0 0 100% 0)",
                  rotation: 1.5,
                  yPercent: 112,
                },
                {
                  autoAlpha: 1,
                  clipPath: "inset(0 0 0% 0)",
                  duration: 0.68,
                  rotation: 0,
                  stagger: 0.12,
                  yPercent: 0,
                },
                0.22,
              )
              .fromTo(
                transitionDivider,
                { autoAlpha: 0, scaleX: 0.08 },
                { autoAlpha: 1, duration: 0.55, scaleX: 1 },
                0.72,
              )
              .fromTo(
                transitionTagline,
                { autoAlpha: 0, letterSpacing: "0.34em", y: 14 },
                {
                  autoAlpha: 1,
                  duration: 0.6,
                  letterSpacing: "0.17em",
                  y: 0,
                },
                0.84,
              )
              .fromTo(
                transitionSparkle,
                { autoAlpha: 0, rotation: -45, scale: 0 },
                {
                  autoAlpha: 1,
                  duration: 0.48,
                  rotation: 0,
                  scale: 1,
                },
                1.05,
              )
              .fromTo(
                transitionScrollLink,
                { autoAlpha: 0, scale: 0.78, y: 12 },
                {
                  autoAlpha: 1,
                  duration: 0.42,
                  scale: 1,
                  y: 0,
                },
                1.16,
              )
              .to(
                transitionCurve,
                {
                  duration: 0.72,
                  ease: "power2.inOut",
                  scaleY: 1.34,
                },
                1.38,
              );
          }

          if (instagram) {
            const instagramCopy = instagram.querySelector<HTMLElement>(
              "[data-scroll-instagram-copy]",
            );
            const instagramEyebrow = instagramCopy?.querySelector<HTMLElement>(
              ".instagram-showcase__eyebrow",
            );
            const instagramTitle =
              instagramCopy?.querySelector<HTMLElement>("h2");
            const instagramTitleAccent =
              instagramTitle?.querySelector<HTMLElement>("span");
            const instagramIntroParts = gsap.utils.toArray<HTMLElement>(
              ".instagram-showcase__intro > *",
              instagramCopy ?? undefined,
            );
            const instagramHalo = instagram.querySelector<HTMLElement>(
              ".instagram-showcase__halo",
            );
            const instagramCards = gsap.utils.toArray<HTMLElement>(
              "[data-scroll-instagram-card]",
              instagram,
            );
            const instagramStages = gsap.utils.toArray<HTMLElement>(
              "[data-scroll-instagram-stage]",
              instagram,
            );
            const instagramCompletionLayers = gsap.utils.toArray<HTMLElement>(
              "[data-scroll-instagram-background], [data-scroll-instagram-subject]",
              instagram,
            );
            const instagramCompletionOverlays = gsap.utils.toArray<HTMLElement>(
              ".instagram-fan__meta, .instagram-fan__shine",
              instagram,
            );

            if (instagramCopy && !mobile) {
              const copyReveal = gsap.timeline({
                defaults: { ease: "power3.out" },
                scrollTrigger: {
                  once: true,
                  start: "top 84%",
                  trigger: instagram,
                },
              });

              if (instagramEyebrow) {
                copyReveal.fromTo(
                  instagramEyebrow,
                  { autoAlpha: 0, x: -28 },
                  { autoAlpha: 1, duration: 0.55, x: 0 },
                );
              }

              if (instagramTitle) {
                copyReveal.fromTo(
                  instagramTitle,
                  {
                    autoAlpha: 0,
                    clipPath: "inset(0 0 100% 0)",
                    y: desktop ? 48 : 30,
                  },
                  {
                    autoAlpha: 1,
                    clipPath: "inset(0 0 0% 0)",
                    duration: 0.82,
                    y: 0,
                  },
                  "-=0.28",
                );
              }

              if (instagramTitleAccent) {
                copyReveal.fromTo(
                  instagramTitleAccent,
                  { autoAlpha: 0, scale: 0.94, x: -18 },
                  {
                    autoAlpha: 1,
                    duration: 0.55,
                    scale: 1,
                    x: 0,
                  },
                  "-=0.42",
                );
              }

              if (instagramIntroParts.length > 0) {
                copyReveal.fromTo(
                  instagramIntroParts,
                  { autoAlpha: 0, x: 30 },
                  {
                    autoAlpha: 1,
                    duration: 0.6,
                    stagger: 0.09,
                    x: 0,
                  },
                  "-=0.45",
                );
              }
            }

            if (instagramHalo && !mobile) {
              gsap.fromTo(
                instagramHalo,
                { rotation: -2.5, scale: 0.92, yPercent: -5 },
                {
                  ease: "none",
                  rotation: 2.5,
                  scale: 1.08,
                  scrollTrigger: {
                    end: "bottom top",
                    invalidateOnRefresh: true,
                    scrub: 0.8,
                    start: "top bottom",
                    trigger: instagram,
                  },
                  yPercent: 5,
                },
              );
            }

            if (pinnedGallery) {
              gsap.set(instagramStages, {
                force3D: true,
                transformOrigin: "50% 55%",
                transformPerspective: 1200,
              });

              const fanReveal = gsap.timeline({
                scrollTrigger: {
                  once: true,
                  start: "top 78%",
                  trigger: instagram,
                },
              });

              fanReveal.fromTo(
                instagramCards,
                {
                  autoAlpha: 0,
                  clipPath: "inset(18% 12% 12% 12% round 0.35rem)",
                },
                {
                  autoAlpha: 1,
                  clipPath: "inset(0% 0% 0% 0% round 0.35rem)",
                  duration: 0.9,
                  ease: "power3.out",
                  stagger: {
                    amount: 0.48,
                    from: "center",
                  },
                },
              );

              fanReveal.fromTo(
                instagramStages,
                {
                  rotationX: 16,
                  scale: 0.84,
                  y: 92,
                },
                {
                  duration: 0.9,
                  ease: "power3.out",
                  rotationX: 0,
                  scale: 1,
                  stagger: {
                    amount: 0.48,
                    from: "center",
                  },
                  y: 0,
                },
                0,
              );

              const fanMeta = gsap.utils.toArray<HTMLElement>(
                ".instagram-fan__meta",
                instagram,
              );
              const fanShine = gsap.utils.toArray<HTMLElement>(
                ".instagram-fan__shine",
                instagram,
              );

              fanReveal
                .fromTo(
                  fanMeta,
                  { autoAlpha: 0, y: 12 },
                  {
                    autoAlpha: 1,
                    duration: 0.42,
                    ease: "power2.out",
                    stagger: 0.035,
                    y: 0,
                  },
                  "-=0.52",
                )
                .fromTo(
                  fanShine,
                  { autoAlpha: 0 },
                  {
                    autoAlpha: 1,
                    duration: 0.45,
                    ease: "power2.out",
                    stagger: 0.05,
                  },
                  "-=0.48",
                );
            } else {
              instagramCards.forEach((card) => {
                const cardReveal = gsap.timeline({
                  scrollTrigger: {
                    once: true,
                    start: "top 93%",
                    trigger: card,
                  },
                });

                cardReveal.fromTo(
                  card,
                  { autoAlpha: 0, y: 28 },
                  {
                    autoAlpha: 1,
                    duration: 0.58,
                    ease: "power3.out",
                    y: 0,
                  },
                );
              });
            }

            if (instagramFlips.length > 0) {
              gsap.set(instagramFlips, {
                force3D: true,
                rotationY: 0,
                transformOrigin: "50% 50%",
              });

              const transformation = gsap.timeline({
                defaults: {
                  ease: "power2.inOut",
                },
                paused: true,
              });

              transformation.to({}, { duration: 0.35 });

              instagramFlips.forEach((flip, index) => {
                const depthBackground = flip.querySelector<HTMLElement>(
                  "[data-scroll-instagram-background]",
                );
                const depthSubject = flip.querySelector<HTMLElement>(
                  "[data-scroll-instagram-subject]",
                );
                const flipPosition = index === 0 ? ">" : "-=0.28";

                transformation.to(
                  flip,
                  {
                    duration: 0.9,
                    force3D: true,
                    rotationY: 180,
                  },
                  flipPosition,
                );

                if (depthBackground) {
                  transformation.fromTo(
                    depthBackground,
                    {
                      force3D: true,
                      scale: 1.06,
                      xPercent: index % 2 === 0 ? -1.2 : 1.2,
                    },
                    {
                      duration: 1.04,
                      ease: "power2.out",
                      force3D: true,
                      scale: 1.015,
                      xPercent: 0,
                    },
                    "<",
                  );
                }

                if (depthSubject) {
                  transformation.fromTo(
                    depthSubject,
                    {
                      force3D: true,
                      scale: 1.025,
                      xPercent: index % 2 === 0 ? 1.2 : -1.2,
                      yPercent: 2,
                    },
                    {
                      duration: 0.96,
                      ease: "power3.out",
                      force3D: true,
                      scale: 1,
                      xPercent: 0,
                      yPercent: 0,
                    },
                    "<+0.06",
                  );
                }
              });

              transformation.to({}, { duration: 0.06 });

              let furthestTransformationProgress = 0;
              const advanceTransformation = (progress: number) => {
                const nextProgress = gsap.utils.clamp(0, 1, progress);

                if (nextProgress <= furthestTransformationProgress) return;

                furthestTransformationProgress = nextProgress;
                transformation.progress(nextProgress);
              };

              ScrollTrigger.create(
                desktop
                  ? {
                      anticipatePin: 1,
                      end: () =>
                        `+=${Math.max(window.innerHeight * 0.85, 720)}`,
                      invalidateOnRefresh: true,
                      onLeave: (self) => {
                        const preservedScrollPosition = self.start;

                        advanceTransformation(1);
                        instagram.dataset.transformationComplete = "true";
                        gsap.set(
                          [
                            ...instagramStages,
                            ...instagramFlips,
                            ...instagramCompletionLayers,
                          ],
                          { clearProps: "transform,willChange" },
                        );
                        gsap.set(instagramCompletionOverlays, {
                          clearProps: "opacity,transform,visibility,willChange",
                        });
                        self.kill(true);
                        window.dispatchEvent(
                          new CustomEvent("francy:settle-scroll", {
                            detail: { top: preservedScrollPosition },
                          }),
                        );
                        window.requestAnimationFrame(() => {
                          ScrollTrigger.refresh();
                        });
                      },
                      onUpdate: (self) => advanceTransformation(self.progress),
                      pin: true,
                      pinSpacing: true,
                      start: "top top",
                      trigger: instagram,
                    }
                  : pinnedGallery
                    ? {
                        end: () =>
                          `+=${Math.max(window.innerHeight * 0.9, 720)}`,
                        invalidateOnRefresh: true,
                        onLeave: () => advanceTransformation(1),
                        onUpdate: (self) =>
                          advanceTransformation(self.progress * 2),
                        start: "top top",
                        trigger: instagram,
                      }
                    : {
                        end: () =>
                          `+=${Math.max(
                            instagram.offsetHeight * 0.55,
                            window.innerHeight * 0.65,
                          )}`,
                        invalidateOnRefresh: true,
                        onLeave: () => advanceTransformation(1),
                        onUpdate: (self) =>
                          advanceTransformation(self.progress),
                        start: "top 72%",
                        trigger: instagram,
                      },
              );
            }
          }

          const footer = scrollRoot.querySelector<HTMLElement>(
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

          const footerScrollEnd = () => {
            const footerHeight = footer.offsetHeight;
            const finishBuffer = Math.min(18, footerHeight * 0.08);
            const finishLine =
              ((window.innerHeight - footerHeight + finishBuffer) /
                window.innerHeight) *
              100;

            return `top ${gsap.utils.clamp(0, 94, finishLine)}%`;
          };

          if (mobile) {
            const footerFrame = footer.querySelector<HTMLElement>(
              ".cabraiz-credit__inner",
            );
            const footerLogo = footer.querySelector<HTMLElement>(
              ".cabraiz-credit__logo",
            );
            const footerWordmark = footer.querySelector<HTMLElement>(
              ".cabraiz-credit__wordmark",
            );
            const footerMenu = footer.querySelector<HTMLElement>(
              ".cabraiz-credit__mobile-menu",
            );
            const footerMenuLines = gsap.utils.toArray<HTMLElement>(
              ".cabraiz-credit__mobile-menu span",
              footer,
            );
            const footerIntroParts = gsap.utils.toArray<HTMLElement>(
              ".cabraiz-credit__intro-eyebrow, .cabraiz-credit__intro h2, .cabraiz-credit__intro p",
              footer,
            );
            const footerMetricIcons = gsap.utils.toArray<HTMLElement>(
              ".cabraiz-credit__metric-icon",
              footer,
            );
            const footerMountainImage = footer.querySelector<HTMLElement>(
              ".cabraiz-credit__mountain img",
            );
            const footerButton = footer.querySelector<HTMLElement>(
              ".cabraiz-credit__cta",
            );
            const footerArrow = footer.querySelector<HTMLElement>(
              ".cabraiz-credit__arrow",
            );

            const mobileFooterReveal = gsap.timeline({
              defaults: { ease: "power3.out" },
              scrollTrigger: {
                end: footerScrollEnd,
                invalidateOnRefresh: true,
                scrub: 0.78,
                start: "top 98%",
                trigger: footer,
              },
            });

            mobileFooterReveal
              .fromTo(
                footerFrame,
                {
                  clipPath: "inset(0 0 14% 0)",
                },
                {
                  clipPath: "inset(0 0 0% 0)",
                  duration: 1,
                },
                0,
              )
              .fromTo(
                footerIdentity,
                { autoAlpha: 0.25, force3D: true, y: -32 },
                { autoAlpha: 1, duration: 0.46, force3D: true, y: 0 },
                0.02,
              )
              .fromTo(
                [footerLogo, footerWordmark, footerMenu],
                { autoAlpha: 0, force3D: true, scale: 0.9, y: 14 },
                {
                  autoAlpha: 1,
                  duration: 0.34,
                  force3D: true,
                  scale: 1,
                  stagger: 0.045,
                  y: 0,
                },
                0.1,
              )
              .fromTo(
                footerMenuLines,
                { scaleX: 0, transformOrigin: "0% 50%", x: -4 },
                {
                  duration: 0.26,
                  scaleX: 1,
                  stagger: 0.025,
                  x: 0,
                },
                0.17,
              )
              .fromTo(
                footerCopy,
                { autoAlpha: 0, force3D: true, y: 32 },
                { autoAlpha: 1, duration: 0.54, force3D: true, y: 0 },
                0.2,
              )
              .fromTo(
                footerIntroParts,
                { autoAlpha: 0, force3D: true, y: 22 },
                {
                  autoAlpha: 1,
                  duration: 0.38,
                  force3D: true,
                  stagger: 0.055,
                  y: 0,
                },
                0.25,
              )
              .fromTo(
                footerMetrics,
                {
                  autoAlpha: 0,
                  force3D: true,
                  scale: 0.94,
                  x: (index) => (index % 2 === 0 ? -28 : 28),
                  y: 18,
                },
                {
                  autoAlpha: 1,
                  duration: 0.46,
                  force3D: true,
                  scale: 1,
                  stagger: 0.06,
                  x: 0,
                  y: 0,
                },
                0.34,
              )
              .fromTo(
                footerMetricIcons,
                {
                  force3D: true,
                  rotation: (index) => (index % 2 === 0 ? -22 : 22),
                  scale: 0.55,
                },
                {
                  duration: 0.42,
                  force3D: true,
                  rotation: 0,
                  scale: 1,
                  stagger: 0.055,
                },
                0.4,
              )
              .fromTo(
                footerCta,
                { autoAlpha: 0.2 },
                { autoAlpha: 1, duration: 0.68 },
                0.48,
              )
              .fromTo(
                footerMountainImage,
                { force3D: true, scale: 1.13, yPercent: 7 },
                {
                  duration: 0.86,
                  ease: "none",
                  force3D: true,
                  scale: 1,
                  yPercent: 0,
                },
                0.44,
              )
              .fromTo(
                footerButton,
                {
                  autoAlpha: 0,
                  force3D: true,
                  scale: 0.88,
                  y: 48,
                },
                {
                  autoAlpha: 1,
                  duration: 0.5,
                  force3D: true,
                  scale: 1,
                  y: 0,
                },
                0.64,
              )
              .fromTo(
                footerArrow,
                { force3D: true, rotation: -34, scale: 0.72 },
                {
                  duration: 0.38,
                  force3D: true,
                  rotation: 0,
                  scale: 1,
                },
                0.72,
              )
              .fromTo(
                footerSignature,
                { autoAlpha: 0, force3D: true, y: 18 },
                { autoAlpha: 1, duration: 0.42, force3D: true, y: 0 },
                0.82,
              );
          } else {
            const footerReveal = gsap.timeline({
              defaults: { ease: "power2.out" },
              scrollTrigger: {
                end: footerScrollEnd,
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
          }
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
