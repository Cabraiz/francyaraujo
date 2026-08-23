import { expect, test } from "@playwright/test";

const siteUrl = "https://francyaraujo.com";

test("publica sinais técnicos e locais de SEO", async ({ page, request }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await expect(page).toHaveTitle(
    "Francy Araújo | Cabeleireira e especialista em ruivos em Fortaleza",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    siteUrl,
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /cabeleireira.*ruivos.*Dionísio Torres.*Fortaleza/i,
  );
  await expect(page.locator("h1")).toHaveCount(1);

  const jsonLd = await page
    .locator('script[type="application/ld+json"]')
    .textContent();
  expect(jsonLd).not.toBeNull();

  const structuredData = JSON.parse(jsonLd ?? "{}") as {
    "@graph": Array<Record<string, unknown>>;
  };
  const salon = structuredData["@graph"].find(
    (item) => item["@type"] === "HairSalon",
  );

  expect(salon).toMatchObject({
    name: "Francy Araújo",
    telephone: "+55 88 8190-2582",
    url: siteUrl,
  });
  expect(salon?.sameAs).toContain(
    "https://www.instagram.com/francyaraujocenario/",
  );
  expect(salon?.address).toMatchObject({
    streetAddress: "Rua Israel Bezerra, 46",
    addressLocality: "Fortaleza",
    addressRegion: "CE",
    addressCountry: "BR",
  });

  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  await expect(robots.text()).resolves.toContain(
    "Sitemap: https://francyaraujo.com/sitemap.xml",
  );

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  await expect(sitemap.text()).resolves.toContain(
    "<loc>https://francyaraujo.com</loc>",
  );
});
