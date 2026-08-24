import { expect, test } from "@playwright/test";

const layouts = [
  {
    name: "desktop 720p",
    viewport: { width: 1280, height: 720 },
    objectPosition: "50% 10%",
    expectedHeaderHeight: 75,
    expectedSceneScale: 1,
    maxHeroNameSize: 77,
    maxPreludeCenterDelta: 16,
  },
  {
    name: "desktop 1080p",
    viewport: { width: 1920, height: 1080 },
    objectPosition: "50% 10%",
    expectedHeaderHeight: 88,
    expectedSceneScale: 1,
    maxHeroNameSize: 97,
    maxPreludeCenterDelta: 16,
  },
  {
    name: "tablet",
    viewport: { width: 834, height: 1194 },
    objectPosition: "50% 10%",
    expectedHeaderHeight: 99,
    expectedSceneScale: 1.28,
    maxHeroNameSize: 81,
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
        '[data-scene-frame="0"]',
      );

      return portrait?.complete && portrait.naturalWidth > 0;
    });

    const metrics = await page.evaluate(() => {
      const stage = document.querySelector<HTMLElement>(".hero-stage");
      const prelude = document.querySelector<HTMLElement>(
        "[data-hero-prelude]",
      );
      const portrait = document.querySelector<HTMLImageElement>(
        '[data-scene-frame="0"]',
      );
      const navigation = document.querySelector<HTMLElement>(
        '[aria-label="Navegação principal"]',
      );
      const heroCopy = document.querySelector<HTMLElement>(".hero-copy");
      const heroName = document.querySelector<HTMLElement>(".hero-name-first");
      const heroSignature = document.querySelector<HTMLElement>(
        ".hero-signature-lockup",
      );
      const heroTagline = document.querySelector<HTMLElement>(".hero-tagline");
      const heroWaves = document.querySelector<HTMLElement>(".hero-waves");
      const ritual = Array.from(
        document.querySelectorAll<HTMLElement>(".hero-prelude-title span"),
      ).find((element) => element.textContent?.includes("um ritual"));
      const preludeCopy = document.querySelector<HTMLElement>(
        ".hero-prelude-copy",
      );

      if (
        !(
          stage &&
          prelude &&
          portrait &&
          navigation &&
          ritual &&
          preludeCopy &&
          heroCopy &&
          heroName &&
          heroSignature &&
          heroTagline &&
          heroWaves
        )
      ) {
        throw new Error("Hero responsivo não encontrado.");
      }

      const stageRect = stage.getBoundingClientRect();
      const preludeRect = prelude.getBoundingClientRect();
      const imageScale = Math.min(
        stageRect.width / portrait.naturalWidth,
        stageRect.height / portrait.naturalHeight,
      );
      const portraitStyle = getComputedStyle(portrait);
      const portraitMatrix = new DOMMatrix(portraitStyle.transform);
      const portraitRect = portrait.getBoundingClientRect();
      const heroCopyRect = heroCopy.getBoundingClientRect();
      const signatureRect = heroSignature.getBoundingClientRect();
      const wavesRect = heroWaves.getBoundingClientRect();
      const wavesStyle = getComputedStyle(heroWaves);
      const ritualRange = document.createRange();
      ritualRange.selectNodeContents(ritual);
      const copyRange = document.createRange();
      copyRange.selectNodeContents(preludeCopy);
      const copyStyle = getComputedStyle(preludeCopy);

      return {
        scrollbarWidth: getComputedStyle(document.documentElement).scrollbarWidth,
        webkitScrollbarDisplay: getComputedStyle(
          document.documentElement,
          "::-webkit-scrollbar",
        ).display,
        horizontalOverflow:
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
        headerHeight: navigation.getBoundingClientRect().height,
        heroCopyWidth: heroCopyRect.width,
        heroNameSize: Number.parseFloat(getComputedStyle(heroName).fontSize),
        heroSignatureOverflow: Math.max(
          0,
          signatureRect.right - heroCopyRect.right,
        ),
        heroTaglineLineCount: new Set(
          Array.from(heroTagline.children, (element) =>
            Math.round((element as HTMLElement).offsetTop),
          ),
        ).size,
        heroWavesMask: wavesStyle.maskImage,
        heroWavesWidthRatio: wavesRect.width / stageRect.width,
        objectPosition: portraitStyle.objectPosition,
        sceneTopGap: Math.max(0, portraitRect.top - stageRect.top),
        sceneScale: Math.hypot(portraitMatrix.a, portraitMatrix.b),
        ritualWidth: ritualRange.getBoundingClientRect().width,
        preludeCopyWidth: preludeCopy.getBoundingClientRect().width,
        preludeCopyBorderLeft: Number.parseFloat(copyStyle.borderLeftWidth),
        preludeCopyLineCount: new Set(
          Array.from(copyRange.getClientRects(), (rect) => Math.round(rect.top)),
        ).size,
        sceneAspectRatio: portrait.naturalWidth / portrait.naturalHeight,
        preludeCenterDelta:
          (preludeRect.top + preludeRect.bottom) / 2 -
          (stageRect.top + stageRect.bottom) / 2,
        verticalImageCrop:
          Math.max(0, portrait.naturalHeight * imageScale - stageRect.height),
      };
    });

    expect(metrics.objectPosition, layout.name).toBe(layout.objectPosition);
    expect(
      metrics.sceneTopGap,
      `${layout.name}: faixa vazia entre header e fotografia`,
    ).toBeLessThanOrEqual(1);
    expect(metrics.scrollbarWidth, `${layout.name}: scrollbar visível`).toBe(
      "none",
    );
    expect(
      metrics.webkitScrollbarDisplay,
      `${layout.name}: scrollbar WebKit visível`,
    ).toBe("none");
    expect(metrics.sceneScale, layout.name).toBeCloseTo(
      layout.expectedSceneScale,
      2,
    );
    expect(metrics.heroNameSize, `${layout.name}: nome grande demais`).toBeLessThanOrEqual(
      layout.maxHeroNameSize,
    );
    expect(metrics.heroSignatureOverflow, `${layout.name}: assinatura fora dos 100%`).toBeLessThanOrEqual(
      1,
    );
    expect(metrics.heroTaglineLineCount, `${layout.name}: slogan quebrou linha`).toBe(1);
    expect(
      metrics.heroWavesMask,
      `${layout.name}: ondas sem dissolução lateral`,
    ).toContain("90deg");
    expect(
      metrics.heroWavesWidthRatio,
      `${layout.name}: ondas com largura incorreta`,
    ).toBeCloseTo(0.64, 2);
    expect(
      Math.abs(metrics.preludeCopyWidth - metrics.ritualWidth),
      `${layout.name}: subtítulo precisa ter a largura de "um ritual."`,
    ).toBeLessThanOrEqual(1);
    expect(
      metrics.preludeCopyBorderLeft,
      `${layout.name}: traço vertical ausente`,
    ).toBe(1);
    expect(
      metrics.preludeCopyLineCount,
      `${layout.name}: subtítulo precisa ocupar duas linhas`,
    ).toBe(2);
    expect(metrics.headerHeight, layout.name).toBeCloseTo(
      layout.expectedHeaderHeight,
      0,
    );
    expect(metrics.horizontalOverflow, layout.name).toBeLessThanOrEqual(1);
    expect(metrics.sceneAspectRatio, `${layout.name}: cena fora do formato`).toBe(
      1.5,
    );

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
