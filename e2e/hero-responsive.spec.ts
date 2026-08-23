import { expect, test } from "@playwright/test";

const layouts = [
  {
    name: "desktop 720p",
    viewport: { width: 1280, height: 720 },
    objectPosition: "50% 18%",
    maxPreludeCenterDelta: 16,
  },
  {
    name: "desktop 1080p",
    viewport: { width: 1920, height: 1080 },
    objectPosition: "50% 18%",
    maxPreludeCenterDelta: 16,
  },
  {
    name: "tablet",
    viewport: { width: 834, height: 1194 },
    objectPosition: "72% 50%",
    maxPreludeCenterDelta: null,
  },
] as const;

test("mantém o enquadramento responsivo do hero", async ({ page }) => {
  for (const layout of layouts) {
    await page.setViewportSize(layout.viewport);
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await page.evaluate(async () => {
      await document.fonts.ready;
    });
    await page.waitForFunction(() => {
      const portrait = document.querySelector<HTMLImageElement>(
        '[data-portrait-frame="0"]',
      );

      return portrait?.complete && portrait.naturalWidth > 0;
    });

    const metrics = await page.evaluate(() => {
      const stage = document.querySelector<HTMLElement>(".hero-stage");
      const prelude = document.querySelector<HTMLElement>(
        "[data-hero-prelude]",
      );
      const portrait = document.querySelector<HTMLImageElement>(
        '[data-portrait-frame="0"]',
      );

      if (!(stage && prelude && portrait)) {
        throw new Error("Hero responsivo não encontrado.");
      }

      const stageRect = stage.getBoundingClientRect();
      const preludeRect = prelude.getBoundingClientRect();
      const imageScale = Math.max(
        stageRect.width / portrait.naturalWidth,
        stageRect.height / portrait.naturalHeight,
      );

      return {
        horizontalOverflow:
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
        objectPosition: getComputedStyle(portrait).objectPosition,
        preludeCenterDelta:
          (preludeRect.top + preludeRect.bottom) / 2 -
          (stageRect.top + stageRect.bottom) / 2,
        verticalImageCrop:
          portrait.naturalHeight * imageScale - stageRect.height,
      };
    });

    expect(metrics.objectPosition, layout.name).toBe(layout.objectPosition);
    expect(metrics.horizontalOverflow, layout.name).toBeLessThanOrEqual(1);

    if (layout.maxPreludeCenterDelta !== null) {
      expect(
        Math.abs(metrics.preludeCenterDelta),
        `${layout.name}: texto fora do centro vertical`,
      ).toBeLessThanOrEqual(layout.maxPreludeCenterDelta);
    } else {
      expect(
        metrics.verticalImageCrop,
        "tablet: a personagem não deve sofrer corte vertical",
      ).toBeLessThanOrEqual(1);
    }
  }
});
