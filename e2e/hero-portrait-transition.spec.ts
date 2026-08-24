import { expect, test } from "@playwright/test";

type PortraitFrameState = {
  frame: string | null;
  opacity: number;
  visibility: string;
};

const transitionCheckpoints = [
  0.2, 0.3, 0.36, 0.42, 0.48, 0.54, 0.6, 0.66, 0.72, 0.8, 0.9,
];

test("troca cinco fases sem crossfade nem deslocar o enquadramento", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const hero = page.locator("[data-scroll-hero]");
  const frames = page.locator("[data-hero-portrait-frame]");

  await expect(frames).toHaveCount(5);
  await page.waitForFunction(() =>
    Array.from(
      document.querySelectorAll<HTMLImageElement>(
        "[data-hero-portrait-frame]",
      ),
    ).every((image) => image.complete && image.naturalWidth > 0),
  );

  const portraitDimensions = await frames.evaluateAll((images) =>
    images.map((image) => {
      const portrait = image as HTMLImageElement;

      return {
        height: portrait.naturalHeight,
        width: portrait.naturalWidth,
      };
    }),
  );

  expect(portraitDimensions).toEqual([
    { height: 1536, width: 1024 },
    { height: 1536, width: 1024 },
    { height: 1536, width: 1024 },
    { height: 1536, width: 1024 },
    { height: 1536, width: 1024 },
  ]);

  const portraitSources = await frames.evaluateAll((images) =>
    images.map((image) => (image as HTMLImageElement).currentSrc),
  );
  expect(new Set(portraitSources).size).toBe(5);

  const sceneSource = await page
    .locator("[data-hero-salon] img")
    .evaluate((image) => (image as HTMLImageElement).currentSrc);
  expect(sceneSource).toContain("hero-francy-salon-background");
  expect(portraitSources).not.toContain(sceneSource);

  const heroMetrics = await hero.evaluate((element) => ({
    scrollableDistance: Math.max(0, element.scrollHeight - innerHeight),
    top: element.getBoundingClientRect().top + window.scrollY,
  }));

  for (const progress of transitionCheckpoints) {
    const scrollTop =
      heroMetrics.top + heroMetrics.scrollableDistance * progress;

    await page.evaluate((top) => window.scrollTo(0, top), scrollTop);
    await page.waitForTimeout(900);

    const portraitOpacity = await page
      .locator("[data-hero-portrait]")
      .evaluate((element) => Number(getComputedStyle(element).opacity));

    if (progress >= 0.58) {
      expect(
        portraitOpacity,
        `progresso ${progress}: o retrato principal ficou invisível`,
      ).toBeGreaterThan(0.5);
    }

    const states = await frames.evaluateAll(
      (images): PortraitFrameState[] =>
        images.map((image) => {
          const style = getComputedStyle(image);

          return {
            frame: image.getAttribute("data-portrait-frame"),
            opacity: Number(style.opacity),
            visibility: style.visibility,
          };
        }),
    );
    expect(
      states.every(({ opacity }) => opacity === 1),
      `progresso ${progress}: ${JSON.stringify(states)}`,
    ).toBe(true);

    const clipPaths = await frames.evaluateAll((images) =>
      images.map((image) => getComputedStyle(image).clipPath),
    );
    const partiallyRevealed = clipPaths.filter((clipPath) => {
      const rightInset = clipPath.match(/inset\([^ ]+ ([\d.]+)%/)?.[1];
      const percentage = rightInset ? Number.parseFloat(rightInset) : 0;

      return percentage > 0.5 && percentage < 99.5;
    });

    expect(
      partiallyRevealed.length,
      `progresso ${progress}: mais de uma máscara intermediária`,
    ).toBeLessThanOrEqual(1);
  }

  const frameTransformAt = async (progress: number, frame: string) => {
    const scrollTop =
      heroMetrics.top + heroMetrics.scrollableDistance * progress;

    await page.evaluate((top) => window.scrollTo(0, top), scrollTop);
    await page.waitForTimeout(900);

    return page
      .locator(`[data-portrait-frame='${frame}']`)
      .evaluate((element) => {
        const matrix = new DOMMatrix(getComputedStyle(element).transform);

        return {
          scale: Math.hypot(matrix.a, matrix.b),
          x: matrix.e,
          y: matrix.f,
        };
      });
  };

  const transforms = [];

  for (const [progress, frame] of [
    [0.2, "0"],
    [0.42, "1"],
    [0.54, "2"],
    [0.66, "3"],
    [0.84, "4"],
  ] as const) {
    transforms.push(await frameTransformAt(progress, frame));
  }

  for (const transform of transforms.slice(1)) {
    expect(transform.scale).toBeCloseTo(transforms[0]?.scale ?? 0, 2);
    expect(transform.x).toBeCloseTo(transforms[0]?.x ?? 0, 0);
    expect(transform.y).toBeCloseTo(transforms[0]?.y ?? 0, 0);
  }
});
