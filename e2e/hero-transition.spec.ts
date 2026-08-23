import { expect, test } from "@playwright/test";

test("troca as personagens sem clarão ou dupla exposição", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await page.waitForFunction(() =>
    [...document.querySelectorAll<HTMLImageElement>("[data-portrait-frame]")].every(
      (image) => image.complete && image.naturalWidth > 0,
    ),
  );

  const initialState = await page.evaluate(() => {
    const scene = document.querySelector<HTMLImageElement>(".hero-scene-frame");
    const firstFrame = document.querySelector<HTMLImageElement>(
      '[data-portrait-frame="0"]',
    );
    const portrait = document.querySelector<HTMLElement>("[data-hero-portrait]");

    if (!(scene && firstFrame && portrait)) {
      throw new Error("Camadas da transição do hero não encontradas.");
    }

    return {
      frameOpacities: [
        ...document.querySelectorAll<HTMLElement>("[data-portrait-frame]"),
      ].map((frame) => Number(getComputedStyle(frame).opacity)),
      portraitTransitionDuration: getComputedStyle(portrait).transitionDuration,
      sameSalonScene: scene.currentSrc === firstFrame.currentSrc,
      sheenExists: Boolean(document.querySelector("[data-scroll-hero-sheen]")),
    };
  });

  expect(initialState.sameSalonScene).toBe(true);
  expect(initialState.sheenExists).toBe(false);
  expect(initialState.portraitTransitionDuration).toBe("0s");
  expect(initialState.frameOpacities).toEqual([1, 1, 1]);

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

    expect(
      frames[0],
      `quadro base ausente no progresso ${progress}`,
    ).toMatchObject({
      opacity: 1,
      visibility: "visible",
    });
    expect(
      frames.every((frame) => frame.opacity === 1),
      `opacidade abriu um clarão no progresso ${progress}`,
    ).toBe(true);
    expect(frames[0]?.clipPath).not.toContain("100%");
  }

  const sequence = [];

  for (const progress of [0.12, 0.52, 0.86]) {
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
          .map((frame) => getComputedStyle(frame).clipPath)
          .findLastIndex((clipPath) => !clipPath.includes("100%")),
      ),
    );
  }

  expect(sequence).toEqual([0, 1, 2]);
});
