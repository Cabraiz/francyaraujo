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
      const flag = element.querySelector<HTMLElement>(
        ".cabraiz-credit__flag",
      );
      const action = element.querySelector<HTMLElement>(
        ".cabraiz-credit__action",
      );
      const cta = element.querySelector<HTMLElement>(
        ".cabraiz-credit__cta",
      );
      const mountainImage = element.querySelector<HTMLElement>(
        ".cabraiz-credit__mountain img",
      );
      const metricValue = metrics[0]?.querySelector<HTMLElement>("strong");
      const metricLabel = metrics[0]?.querySelector<HTMLElement>("span");
      const footerRect = element.getBoundingClientRect();
      const metricTops = metrics.map((metric) =>
        Math.round(metric.getBoundingClientRect().top),
      );

      return {
        footerHeight: footerRect.height,
        flagWidth: flag ? Number.parseFloat(getComputedStyle(flag).width) : 0,
        mountainImageDisplay: mountainImage
          ? getComputedStyle(mountainImage).display
          : "missing",
        metricValueSize: metricValue
          ? Number.parseFloat(getComputedStyle(metricValue).fontSize)
          : 0,
        metricLabelSize: metricLabel
          ? Number.parseFloat(getComputedStyle(metricLabel).fontSize)
          : 0,
        ctaStartRatio: action && cta ? cta.offsetLeft / action.clientWidth : 0,
        ctaWidthRatio: action && cta ? cta.offsetWidth / action.clientWidth : 0,
        metricCount: metrics.length,
        metricRows: new Set(metricTops).size,
        horizontalOverflow:
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      };
    });

    expect(layout.footerHeight, `${viewport.name}: altura do rodapé`).toBeGreaterThanOrEqual(350);
    expect(layout.footerHeight, `${viewport.name}: altura do rodapé`).toBeLessThanOrEqual(430);
    expect(layout.flagWidth, `${viewport.name}: largura das bandeiras`).toBeCloseTo(23.04, 1);
    expect(layout.mountainImageDisplay, `${viewport.name}: montanha oculta`).toBe("none");
    expect(layout.ctaStartRatio, `${viewport.name}: posição do CTA`).toBeCloseTo(0.42, 2);
    expect(layout.ctaWidthRatio, `${viewport.name}: largura do CTA`).toBeCloseTo(0.58, 2);
    expect(layout.metricValueSize, `${viewport.name}: valor legível`).toBeGreaterThanOrEqual(11.8);
    expect(layout.metricLabelSize, `${viewport.name}: legenda legível`).toBeGreaterThanOrEqual(6.4);
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
