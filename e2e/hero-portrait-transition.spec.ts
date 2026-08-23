import { expect, test } from "@playwright/test";

type PortraitFrameState = {
  frame: string | null;
  opacity: number;
  visibility: string;
};

const transitionCheckpoints = [
  0.2, 0.48, 0.51, 0.54, 0.58, 0.64, 0.7, 0.73, 0.76, 0.8, 0.88, 0.96,
];

test("troca três poses sem sobrepor nem deslocar o enquadramento", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const hero = page.locator("[data-scroll-hero]");
  const frames = page.locator("[data-hero-portrait-frame]");

  await expect(frames).toHaveCount(3);
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
    { height: 1024, width: 1536 },
    { height: 1024, width: 1536 },
    { height: 1024, width: 1536 },
  ]);

  const portraitSources = await frames.evaluateAll((images) =>
    images.map((image) => (image as HTMLImageElement).currentSrc),
  );
  expect(new Set(portraitSources).size).toBe(3);

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
    const visibleFrames = states.filter(
      ({ opacity, visibility }) => visibility !== "hidden" && opacity > 0.05,
    );

    expect(
      visibleFrames.length,
      `progresso ${progress}: ${JSON.stringify(states)}`,
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

  const first = await frameTransformAt(0.32, "0");
  const second = await frameTransformAt(0.64, "1");
  const third = await frameTransformAt(0.9, "2");

  expect(second.scale).toBeCloseTo(first.scale, 2);
  expect(second.x).toBeCloseTo(first.x, 0);
  expect(second.y).toBeCloseTo(first.y, 0);
  expect(third.scale).toBeCloseTo(second.scale, 2);
  expect(third.x).toBeCloseTo(second.x, 0);
  expect(third.y).toBeCloseTo(second.y, 0);
});
