import { expect, test } from "@playwright/test";

const criticalHeroAssets = [
  "**/hero-francy-scene-01-black-hd-honey-v2.avif",
  "**/hero-mobile-closeup-01-black.webp",
] as const;

test("protege o primeiro frame até fontes e imagem crítica estarem prontas", async ({
  page,
}) => {
  for (const asset of criticalHeroAssets) {
    await page.route(asset, async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1_000));
      await route.continue();
    });
  }

  await page.goto("/", { waitUntil: "domcontentloaded" });

  const root = page.locator("html");
  const loader = page.locator("[data-site-loader]");
  const content = page.locator(".site-content");

  await expect(root).toHaveAttribute("data-site-loading", "true");
  await expect(loader).toBeVisible();
  await expect(loader).toContainText("FRANCY ARAÚJO");
  await expect(loader).toContainText("Preparando seu ritual");
  await expect(loader.locator("img")).toHaveCount(1);
  await expect(content).toHaveCSS("opacity", "0");
  await expect(root).toHaveCSS("overflow", "hidden");

  await expect(loader).toBeHidden({ timeout: 10_000 });
  await expect(root).toHaveAttribute("data-site-loading", "ready");
  await expect(content).toHaveCSS("opacity", "1");
  await expect(root).not.toHaveCSS("overflow", "hidden");
});
