import { expect, test } from "@playwright/test";

test("troca recortes transparentes sobre um único salão", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await page.waitForFunction(() =>
    [...document.querySelectorAll<HTMLImageElement>("[data-portrait-frame]")].every(
      (image) => image.complete && image.naturalWidth > 0,
    ),
  );
  await page.waitForFunction(() =>
    [...document.querySelectorAll<HTMLElement>("[data-portrait-frame]")].every(
      (frame) => getComputedStyle(frame).clipPath !== "none",
    ),
  );

  const initialState = await page.evaluate(async () => {
    const scene = document.querySelector<HTMLImageElement>(".hero-scene-frame");
    const firstFrame = document.querySelector<HTMLImageElement>(
      '[data-portrait-frame="0"]',
    );
    const portrait = document.querySelector<HTMLElement>("[data-hero-portrait]");

    if (!(scene && firstFrame && portrait)) {
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
        ...document.querySelectorAll<HTMLElement>("[data-portrait-frame]"),
      ].map((frame) => Number(getComputedStyle(frame).opacity)),
      portraitTransitionDuration: getComputedStyle(portrait).transitionDuration,
      fixedSalonScene:
        scene.currentSrc.includes("hero-francy-salon-background") &&
        scene.currentSrc !== firstFrame.currentSrc,
      sheenWidthRatio:
        Number.parseFloat(
          getComputedStyle(
            document.querySelector<HTMLElement>("[data-scroll-hero-sheen]") ??
              document.documentElement,
          ).width,
        ) /
        window.innerWidth,
    };
  });

  expect(initialState.fixedSalonScene).toBe(true);
  expect(initialState.cornerAlpha).toBe(0);
  expect(initialState.sheenWidthRatio).toBeLessThanOrEqual(0.07);
  expect(initialState.portraitTransitionDuration).toBe("0s");
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
      [...document.querySelectorAll<HTMLElement>("[data-portrait-frame]")].map(
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
      `personagens sobrepostas no progresso ${progress}`,
    ).toBeLessThanOrEqual(1);
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
        [...document.querySelectorAll<HTMLElement>("[data-portrait-frame]")]
          .map((frame) => Number(getComputedStyle(frame).opacity))
          .findLastIndex((opacity) => opacity > 0.5),
      ),
    );
  }

  expect(sequence).toEqual([0, 1, 2, 3, 4]);
});
