import { expect, test } from "@playwright/test";

test("troca fotografias completas com cenário e luz coerentes", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await page.waitForFunction(() =>
    [...document.querySelectorAll<HTMLImageElement>("[data-scene-frame]")].every(
      (image) => image.complete && image.naturalWidth > 0,
    ),
  );
  await page.waitForFunction(() =>
    [...document.querySelectorAll<HTMLElement>("[data-scene-frame]")].every(
      (frame) => getComputedStyle(frame).clipPath !== "none",
    ),
  );

  const initialState = await page.evaluate(async () => {
    const firstFrame = document.querySelector<HTMLImageElement>(
      '[data-scene-frame="0"]',
    );
    const sequence = document.querySelector<HTMLElement>("[data-hero-sequence]");

    if (!(firstFrame && sequence)) {
      throw new Error("Camadas da transição do hero não encontradas.");
    }

    const canvas = document.createElement("canvas");
    canvas.width = firstFrame.naturalWidth;
    canvas.height = firstFrame.naturalHeight;
    const context = canvas.getContext("2d", { willReadFrequently: true });

    if (!context) throw new Error("Canvas indisponível para validar o alpha.");

    context.drawImage(firstFrame, 0, 0);
    const cornerAlpha = context.getImageData(0, 0, 1, 1).data[3];

    return {
      cornerAlpha,
      frameOpacities: [
        ...document.querySelectorAll<HTMLElement>("[data-scene-frame]"),
      ].map((frame) => Number(getComputedStyle(frame).opacity)),
      fullCompositeFrame: firstFrame.currentSrc.includes("hero-francy-scene"),
      sequenceTransitionDuration: getComputedStyle(sequence).transitionDuration,
      beamOpacity: Number(
        getComputedStyle(
          document.querySelector<HTMLElement>(
            "[data-hero-transition-beam]",
          ) ?? document.documentElement,
        ).opacity,
      ),
      beamWidthRatio:
        Number.parseFloat(
          getComputedStyle(
            document.querySelector<HTMLElement>(
              "[data-hero-transition-beam]",
            ) ?? document.documentElement,
          ).width,
        ) /
        window.innerWidth,
    };
  });

  expect(initialState.fullCompositeFrame).toBe(true);
  expect(initialState.cornerAlpha).toBe(255);
  expect(initialState.beamOpacity).toBe(0);
  expect(initialState.beamWidthRatio).toBeLessThanOrEqual(0.05);
  expect(initialState.sequenceTransitionDuration).toBe("0s");
  expect(initialState.frameOpacities).toEqual([1, 0, 0, 0, 0]);

  for (const progress of [0.2, 0.44, 0.58, 0.72, 0.88]) {
    await page.evaluate((ratio) => {
      const hero = document.querySelector<HTMLElement>("[data-scroll-hero]");

      if (!hero) throw new Error("Hero não encontrado.");

      window.scrollTo({
        top: hero.offsetTop + (hero.offsetHeight - window.innerHeight) * ratio,
      });
    }, progress);
    await page.waitForTimeout(850);

    const frames = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>("[data-scene-frame]")].map(
        (frame) => ({
          clipPath: getComputedStyle(frame).clipPath,
          opacity: Number(getComputedStyle(frame).opacity),
          visibility: getComputedStyle(frame).visibility,
        }),
      ),
    );

    const visibleFrames = frames.filter(
      (frame) => frame.opacity > 0.5 && frame.visibility === "visible",
    );

    expect(
      visibleFrames.length,
      `wipe sem cena de base no progresso ${progress}`,
    ).toBeGreaterThanOrEqual(1);
    expect(
      visibleFrames.length,
      `mais de duas cenas no wipe ${progress}`,
    ).toBeLessThanOrEqual(2);
  }

  for (const progress of [0.35, 0.47, 0.59, 0.71]) {
    await page.evaluate((ratio) => {
      const hero = document.querySelector<HTMLElement>("[data-scroll-hero]");

      if (!hero) throw new Error("Hero não encontrado.");

      window.scrollTo({
        top: hero.offsetTop + (hero.offsetHeight - window.innerHeight) * ratio,
      });
    }, progress);
    await page.waitForTimeout(850);

    const wipeState = await page.evaluate(() => {
      const visibleFrames = [
        ...document.querySelectorAll<HTMLElement>("[data-scene-frame]"),
      ]
        .map((frame) => {
          const style = getComputedStyle(frame);

          return {
            clipPath: style.clipPath,
            opacity: Number(style.opacity),
            visibility: style.visibility,
          };
        })
        .filter(
          (frame) => frame.opacity > 0.5 && frame.visibility === "visible",
        );
      const beam = document.querySelector<HTMLElement>(
        "[data-hero-transition-beam]",
      );

      return {
        beamOpacity: beam ? Number(getComputedStyle(beam).opacity) : 0,
        boundaryPositions: visibleFrames.map((frame) => {
          const match = frame.clipPath.match(
            /polygon\([^,]+,\s*(-?[\d.]+)%/,
          );

          return match?.[1] ? Number.parseFloat(match[1]) : null;
        }),
        visibleFrameCount: visibleFrames.length,
      };
    });

    expect(wipeState.visibleFrameCount, `wipe no progresso ${progress}`).toBe(2);
    expect(wipeState.beamOpacity, `feixe no progresso ${progress}`).toBeGreaterThan(
      0.1,
    );
    expect(
      wipeState.boundaryPositions.some(
        (position) => position !== null && position > -12 && position < 132,
      ),
      `máscara diagonal não progrediu em ${progress}`,
    ).toBe(true);
  }

  const sequence = [];

  for (const progress of [0.16, 0.34, 0.46, 0.58, 0.74]) {
    await page.evaluate((ratio) => {
      const hero = document.querySelector<HTMLElement>("[data-scroll-hero]");

      if (!hero) throw new Error("Hero não encontrado.");

      window.scrollTo({
        top: hero.offsetTop + (hero.offsetHeight - window.innerHeight) * ratio,
      });
    }, progress);
    await page.waitForTimeout(850);

    sequence.push(
      await page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>("[data-scene-frame]")]
          .map((frame) => Number(getComputedStyle(frame).opacity))
          .findLastIndex((opacity) => opacity > 0.5),
      ),
    );
  }

  expect(sequence).toEqual([0, 1, 2, 3, 4]);
});
