import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";
import path from "node:path";

const outputDirectory = path.resolve(
  process.env.SCREENSHOT_OUTPUT_DIR || "artifacts/screenshots",
);

test.beforeAll(() => {
  mkdirSync(outputDirectory, { recursive: true });
});

test("captura profissional da página inicial", async ({ page }, testInfo) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/", { waitUntil: "networkidle" });

  await page.addStyleTag({
    content: `
      nextjs-portal { display: none !important; }
      * { caret-color: transparent !important; }
    `,
  });

  await page.evaluate(async () => {
    await document.fonts.ready;
  });

  await page.waitForFunction(() =>
    Array.from(document.images)
      .filter((image) => image.getBoundingClientRect().top < innerHeight * 1.5)
      .every((image) => image.complete && image.naturalWidth > 0),
  );

  await expect(
    page.getByRole("navigation", { name: "Navegação principal" }),
  ).toBeVisible();

  const hero = page.locator("[data-scroll-hero]");
  const revealPosition = await hero.evaluate((element) => {
    const top = element.getBoundingClientRect().top + window.scrollY;
    const scrollableDistance = Math.max(0, element.scrollHeight - innerHeight);

    return top + scrollableDistance * 0.96;
  });

  await page.evaluate(
    (top) => window.scrollTo({ behavior: "instant", top }),
    revealPosition,
  );
  await page.waitForTimeout(1_000);

  await expect(
    page.getByRole("heading", { exact: true, name: "Francy Araújo" }),
  ).toBeVisible();

  const filename = `francy-home-${testInfo.project.name}.png`;
  const screenshotPath = path.join(outputDirectory, filename);

  await page.screenshot({
    animations: "disabled",
    caret: "hide",
    fullPage: false,
    path: screenshotPath,
  });

  await testInfo.attach(filename, {
    contentType: "image/png",
    path: screenshotPath,
  });
});
