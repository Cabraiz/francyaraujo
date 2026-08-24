import { expect, test } from "@playwright/test";

type SceneFrameState = {
  clipPath: string;
  frame: string | null;
  opacity: number;
  visibility: string;
};

const transitionCheckpoints = [
  0.2, 0.3, 0.36, 0.42, 0.48, 0.54, 0.6, 0.66, 0.72, 0.8, 0.9,
];

test("revela cinco cenas com wipe diagonal sem apagar o fundo nem deslocar o enquadramento", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const hero = page.locator("[data-scroll-hero]");
  const frames = page.locator("[data-hero-scene-frame]");

  await expect(frames).toHaveCount(5);
  await page.waitForFunction(() =>
    Array.from(
      document.querySelectorAll<HTMLImageElement>(
        "[data-hero-scene-frame]",
      ),
    ).every((image) => image.complete && image.naturalWidth > 0),
  );

  const sceneDimensions = await frames.evaluateAll((images) =>
    images.map((image) => {
      const portrait = image as HTMLImageElement;

      return {
        height: portrait.naturalHeight,
        width: portrait.naturalWidth,
      };
    }),
  );

  expect(sceneDimensions).toEqual([
    { height: 1024, width: 1536 },
    { height: 1024, width: 1536 },
    { height: 1024, width: 1536 },
    { height: 1024, width: 1536 },
    { height: 1024, width: 1536 },
  ]);

  const sceneSources = await frames.evaluateAll((images) =>
    images.map((image) => (image as HTMLImageElement).currentSrc),
  );
  expect(new Set(sceneSources).size).toBe(5);
  expect(sceneSources.every((source) => source.includes("hero-francy-scene"))).toBe(
    true,
  );

  const heroMetrics = await hero.evaluate((element) => ({
    scrollableDistance: Math.max(0, element.scrollHeight - innerHeight),
    top: element.getBoundingClientRect().top + window.scrollY,
  }));

  for (const progress of transitionCheckpoints) {
    const scrollTop =
      heroMetrics.top + heroMetrics.scrollableDistance * progress;

    await page.evaluate((top) => window.scrollTo(0, top), scrollTop);
    await page.waitForTimeout(900);

    const sequenceOpacity = await page
      .locator("[data-hero-sequence]")
      .evaluate((element) => Number(getComputedStyle(element).opacity));

    if (progress >= 0.58) {
      expect(
        sequenceOpacity,
        `progresso ${progress}: a sequência principal ficou invisível`,
      ).toBeGreaterThan(0.5);
    }

    const states = await frames.evaluateAll(
      (images): SceneFrameState[] =>
        images.map((image) => {
          const style = getComputedStyle(image);

          return {
            clipPath: style.clipPath,
            frame: image.getAttribute("data-scene-frame"),
            opacity: Number(style.opacity),
            visibility: style.visibility,
          };
        }),
    );
    const visibleStates = states.filter(
      ({ opacity, visibility }) => opacity > 0.5 && visibility === "visible",
    );
    expect(
      visibleStates.length,
      `progresso ${progress}: nenhuma cena sustentando o wipe`,
    ).toBeGreaterThanOrEqual(1);
    expect(
      visibleStates.length,
      `progresso ${progress}: mais de duas cenas simultâneas`,
    ).toBeLessThanOrEqual(2);

    const partiallyRevealed = visibleStates.filter(({ clipPath }) => {
      const boundary = clipPath.match(
        /polygon\([^,]+,\s*(-?[\d.]+)%/,
      )?.[1];
      const percentage = boundary ? Number.parseFloat(boundary) : 132;

      return percentage > -12 && percentage < 132;
    });

    expect(
      partiallyRevealed.length,
      `progresso ${progress}: mais de uma máscara diagonal intermediária`,
    ).toBeLessThanOrEqual(1);
  }

  const frameTransformAt = async (progress: number, frame: string) => {
    const scrollTop =
      heroMetrics.top + heroMetrics.scrollableDistance * progress;

    await page.evaluate((top) => window.scrollTo(0, top), scrollTop);
    await page.waitForTimeout(900);

    return page
      .locator(`[data-scene-frame='${frame}']`)
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

  expect(transforms[0]?.scale).toBeCloseTo(1.28, 2);
});
