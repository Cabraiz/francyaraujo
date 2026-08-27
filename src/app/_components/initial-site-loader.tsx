"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const minimumVisibleDuration = 700;
const maximumAssetWaitDuration = 6_000;
const exitDuration = 520;

type LoaderPhase = "loading" | "leaving" | "hidden";

function waitForImage(image: HTMLImageElement) {
  if (image.complete) return Promise.resolve();

  return new Promise<void>((resolve) => {
    const settle = () => {
      image.removeEventListener("error", settle);
      image.removeEventListener("load", settle);
      resolve();
    };

    image.addEventListener("error", settle, { once: true });
    image.addEventListener("load", settle, { once: true });
  });
}

function getVisibleImages() {
  const viewportHeight = window.innerHeight;

  return Array.from(document.images).filter((image) => {
    const bounds = image.getBoundingClientRect();

    return bounds.bottom > 0 && bounds.top < viewportHeight * 1.25;
  });
}

export function InitialSiteLoader() {
  const [phase, setPhase] = useState<LoaderPhase>("loading");

  useEffect(() => {
    const root = document.documentElement;
    const startedAt = performance.now();
    let cancelled = false;
    let minimumTimer = 0;
    let maximumTimer = 0;
    let exitTimer = 0;

    root.dataset.siteLoading = "true";

    const fontReady = document.fonts?.ready ?? Promise.resolve();
    const imageReady = Promise.all(getVisibleImages().map(waitForImage));
    const maximumWait = new Promise<void>((resolve) => {
      maximumTimer = window.setTimeout(resolve, maximumAssetWaitDuration);
    });

    Promise.race([Promise.all([fontReady, imageReady]), maximumWait]).then(
      () => {
        if (cancelled) return;

        window.clearTimeout(maximumTimer);

        const elapsed = performance.now() - startedAt;
        const remaining = Math.max(0, minimumVisibleDuration - elapsed);

        minimumTimer = window.setTimeout(() => {
          if (cancelled) return;

          root.dataset.siteLoading = "leaving";
          setPhase("leaving");

          exitTimer = window.setTimeout(() => {
            if (cancelled) return;

            root.dataset.siteLoading = "ready";
            setPhase("hidden");
            window.dispatchEvent(new CustomEvent("francy:site-ready"));
          }, exitDuration);
        }, remaining);
      },
    );

    return () => {
      cancelled = true;
      window.clearTimeout(minimumTimer);
      window.clearTimeout(maximumTimer);
      window.clearTimeout(exitTimer);
      root.dataset.siteLoading = "ready";
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      aria-live="polite"
      className={`site-initial-loader ${
        phase === "leaving" ? "site-initial-loader--leaving" : ""
      }`}
      data-site-loader={phase}
      role="status"
    >
      <div aria-hidden="true" className="site-initial-loader__halo" />
      <div className="site-initial-loader__content">
        <div aria-hidden="true" className="site-initial-loader__emblem">
          <Image
            alt=""
            height={136}
            priority
            sizes="(max-width: 767px) 96px, 116px"
            src="/assets/blog/dynamic-routing/preloader-emblem-v1.webp"
            width={136}
          />
        </div>
        <strong className="site-initial-loader__brand">FRANCY ARAÚJO</strong>
        <span className="site-initial-loader__tagline">
          BELEZA · ESTILO · CONFIANÇA
        </span>
        <span aria-hidden="true" className="site-initial-loader__progress">
          <i />
        </span>
        <span className="site-initial-loader__status">
          Preparando seu ritual
        </span>
      </div>
    </div>
  );
}
