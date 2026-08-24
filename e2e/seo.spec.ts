import { expect, test } from "@playwright/test";

const siteUrl = "https://francyaraujo.com";

test("publica sinais técnicos e locais de SEO", async ({ page, request }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await expect(page).toHaveTitle(
    "Francy Araújo | Cabeleireira e Ruivos em Fortaleza",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    siteUrl,
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /cabeleireira.*ruivos.*Fortaleza.*Dionísio Torres.*Francy Araújo/i,
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
  const person = structuredData["@graph"].find(
    (item) => item["@type"] === "Person",
  );
  const webpage = structuredData["@graph"].find(
    (item) => item["@type"] === "WebPage",
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
  expect(salon?.contactPoint).toMatchObject({
    telephone: "+55 88 8190-2582",
    url: expect.stringContaining("https://wa.me/558881902582"),
  });
  expect(person).toMatchObject({
    name: "Francy Araújo",
    jobTitle: "Cabeleireira e especialista em ruivos",
    worksFor: { "@id": `${siteUrl}/#salao` },
  });
  expect(webpage).toMatchObject({
    url: siteUrl,
    about: { "@id": `${siteUrl}/#salao` },
    mainEntity: { "@id": `${siteUrl}/#salao` },
  });

  await expect(page.locator('a[href="/#historia"]')).toHaveCount(1);
  await expect(page.locator('a[href="/#servicos"]')).toHaveCount(1);
  await expect(page.locator("#historia")).toHaveCount(1);
  await expect(page.locator("#servicos")).toHaveCount(1);

  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  const robotsText = await robots.text();
  expect(robotsText).toMatch(/User-Agent: OAI-SearchBot\s+Allow: \//);
  expect(robotsText).toMatch(/User-Agent: ChatGPT-User\s+Allow: \//);
  expect(robotsText).toMatch(/User-Agent: \*\s+Allow: \//);
  expect(robotsText).toContain(
    "Sitemap: https://francyaraujo.com/sitemap.xml",
  );

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  await expect(sitemap.text()).resolves.toContain(
    "<loc>https://francyaraujo.com</loc>",
  );
});
