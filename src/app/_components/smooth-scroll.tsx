"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import type { ReactNode } from "react";
import { useEffect } from "react";

type Props = {
  children: ReactNode;
};

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SmoothScroll({ children }: Readonly<Props>) {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const precisePointer = window.matchMedia("(pointer: fine)");
    let lenis: Lenis | null = null;
    let refreshFrame = 0;

    const stopLenis = () => {
      if (!lenis) return;

      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenis = null;
      gsap.ticker.lagSmoothing(500, 33);
    };

    const updateLenis = (time: number) => {
      lenis?.raf(time * 1000);
    };

    const configureScroll = () => {
      stopLenis();

      if (reducedMotion.matches || !precisePointer.matches) {
        document.documentElement.dataset.scrollMode = "native";
        return;
      }

      lenis = new Lenis({
        anchors: true,
        autoRaf: false,
        lerp: 0.09,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.9,
      });

      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(updateLenis);
      gsap.ticker.lagSmoothing(0);
      document.documentElement.dataset.scrollMode = "lenis";

      refreshFrame = window.requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    configureScroll();
    reducedMotion.addEventListener("change", configureScroll);
    precisePointer.addEventListener("change", configureScroll);

    return () => {
      reducedMotion.removeEventListener("change", configureScroll);
      precisePointer.removeEventListener("change", configureScroll);
      window.cancelAnimationFrame(refreshFrame);
      stopLenis();
      delete document.documentElement.dataset.scrollMode;
    };
  }, []);

  return children;
}
