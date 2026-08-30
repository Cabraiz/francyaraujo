import { expect, test } from "@playwright/test";

const mobileViewports = [
  { name: "393px", width: 393, height: 659 },
  { name: "360px", width: 360, height: 640 },
] as const;

test("mantém o setor Cabraiz compacto e legível no mobile", async ({ page }) => {
  for (const viewport of mobileViewports) {
    await page.setViewportSize(viewport);
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await expect(page.locator("[data-site-loader]")).toBeHidden({
      timeout: 10_000,
    });

    const footer = page.locator(".cabraiz-credit");
    await expect(footer).toBeVisible();
    await footer.scrollIntoViewIfNeeded();

    const layout = await footer.evaluate((element) => {
      const metrics = Array.from(
        element.querySelectorAll<HTMLElement>(".cabraiz-credit__metric"),
      );
      const footerRect = element.getBoundingClientRect();
      const metricTops = metrics.map((metric) =>
        Math.round(metric.getBoundingClientRect().top),
      );

      return {
        footerHeight: footerRect.height,
        metricCount: metrics.length,
        metricRows: new Set(metricTops).size,
        horizontalOverflow:
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      };
    });

    expect(layout.footerHeight, `${viewport.name}: altura do rodapé`).toBeGreaterThanOrEqual(350);
    expect(layout.footerHeight, `${viewport.name}: altura do rodapé`).toBeLessThanOrEqual(430);
    expect(layout.metricCount, `${viewport.name}: indicadores`).toBe(4);
    expect(layout.metricRows, `${viewport.name}: indicadores em uma linha`).toBe(1);
    expect(layout.horizontalOverflow, `${viewport.name}: overflow horizontal`).toBeLessThanOrEqual(0);

    await expect(
      footer.getByRole("link", {
        name: "Visitar o site da Cabraiz",
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      footer.locator(".cabraiz-credit__cta"),
    ).toHaveAccessibleName("Conversar com Cabraiz pelo WhatsApp");
  }
});
