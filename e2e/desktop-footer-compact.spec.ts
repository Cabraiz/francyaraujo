import { expect, test, type Page } from "@playwright/test";

async function measureFooter(page: Page) {
  return page.locator(".cabraiz-credit").evaluate((footer) => {
    const metric = footer.querySelector(".cabraiz-credit__metric");
    const value = metric?.querySelector("strong");
    const label = metric?.querySelector("span");
    const flag = footer.querySelector(".cabraiz-credit__flag");

    return {
      height: Number.parseFloat(getComputedStyle(footer).height),
      valueFont: value ? getComputedStyle(value).fontSize : "missing",
      labelFont: label ? getComputedStyle(label).fontSize : "missing",
      flagWidth: flag ? getComputedStyle(flag).width : "missing",
      flagHeight: flag ? Number.parseFloat(getComputedStyle(flag).height) : 0,
      overflow: document.documentElement.scrollWidth - window.innerWidth,
    };
  });
}

for (const width of [1280, 1366, 1920]) {
  test(`reduz o rodapé em 30% no desktop ${width}×720 sem encolher textos`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1080 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("[data-site-loader]")).toBeHidden();
    await page.evaluate(() => document.fonts.ready);
    const regular = await measureFooter(page);

    await page.setViewportSize({ width, height: 720 });
    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(page.locator("[data-site-loader]")).toBeHidden();
    await page.evaluate(() => document.fonts.ready);
    const compact = await measureFooter(page);
    expect(compact.height / regular.height).toBeCloseTo(0.7, 2);
    expect(compact.valueFont).toBe(regular.valueFont);
    expect(compact.labelFont).toBe(regular.labelFont);
    expect(compact.flagWidth).toBe(regular.flagWidth);
    expect(compact.flagHeight).toBeGreaterThanOrEqual(8);
    expect(compact.overflow).toBeLessThanOrEqual(0);

    const footer = page.locator(".cabraiz-credit");
    // Advance through the pinned gallery with real wheel input before checking
    // the footer reveal; a programmatic jump is intercepted by that section.
    await expect.poll(async () => {
      const atFooter = await footer.evaluate((element) =>
        element.getBoundingClientRect().bottom <= window.innerHeight + 1,
      );
      if (!atFooter) await page.mouse.wheel(0, 1440);
      return atFooter;
    }, { intervals: [1000] }).toBe(true);
    await expect.poll(() => footer.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      const selectors = [
        ".cabraiz-credit__logo",
        ".cabraiz-credit__wordmark",
        ".cabraiz-credit__stats",
        ".cabraiz-credit__signature",
        ".cabraiz-credit__cta-label",
      ];
      return selectors.every((selector) => {
        const child = element.querySelector(selector);
        if (!child) return false;
        const rect = child.getBoundingClientRect();
        return rect.top >= bounds.top - 1 && rect.bottom <= bounds.bottom + 1;
      });
    })).toBe(true);

    // The identity is covered by the footer's intentional WhatsApp hit area.
    const identityBounds = await footer.locator(".cabraiz-credit__identity").boundingBox();
    expect(identityBounds).not.toBeNull();
    if (!identityBounds) throw new Error("Identidade Cabraiz ausente");
    await page.mouse.move(
      identityBounds.x + identityBounds.width / 2,
      identityBounds.y + identityBounds.height / 2,
    );
    const balloon = footer.locator(".cabraiz-credit__speech-balloon");
    await expect(balloon).toBeVisible();
    await expect.poll(() => balloon.evaluate((element) => {
      const bounds = element.closest("footer")?.getBoundingClientRect();
      const rect = element.getBoundingClientRect();
      return Boolean(bounds && rect.top >= bounds.top - 1 && rect.bottom <= bounds.bottom + 1);
    })).toBe(true);
    await expect(footer.locator(".cabraiz-credit__cta")).toHaveAccessibleName(
      "Conversar com Cabraiz pelo WhatsApp",
    );

    await page.mouse.move(0, 0);
    await page.setViewportSize({ width, height: 1080 });
    const restored = await measureFooter(page);
    expect(restored.height).toBeCloseTo(regular.height, 1);
  });
}
