import Image from "next/image";

export function MobilePortfolioTransition() {
  return (
    <section
      aria-labelledby="mobile-portfolio-transition-title"
      className="mobile-portfolio-transition"
      data-scroll-mobile-portfolio-transition
    >
      <div
        className="mobile-portfolio-transition__panel"
        data-mobile-transition-panel
      >
        <div
          aria-hidden="true"
          className="mobile-portfolio-transition__grain"
        />

        <div
          className="mobile-portfolio-transition__content"
          data-mobile-transition-content
        >
          <Image
            alt=""
            aria-hidden="true"
            className="mobile-portfolio-transition__botanical"
            data-mobile-transition-botanical
            height={72}
            src="/assets/blog/dynamic-routing/mobile-transition-botanical.svg"
            width={280}
          />

          <h2
            className="mobile-portfolio-transition__title"
            id="mobile-portfolio-transition-title"
          >
            <span className="mobile-portfolio-transition__line-mask">
              <span data-mobile-transition-title-line>Transformações</span>
            </span>
            <span className="mobile-portfolio-transition__line-mask">
              <span data-mobile-transition-title-line>que</span>
            </span>
            <span className="mobile-portfolio-transition__line-mask">
              <span
                className="mobile-portfolio-transition__title-accent"
                data-mobile-transition-title-line
              >
                falam por si.
              </span>
            </span>
          </h2>

          <Image
            alt=""
            aria-hidden="true"
            className="mobile-portfolio-transition__divider"
            data-mobile-transition-divider
            height={20}
            src="/assets/blog/dynamic-routing/mobile-transition-divider.svg"
            width={240}
          />

          <p
            className="mobile-portfolio-transition__tagline"
            data-mobile-transition-tagline
          >
            BELEZA QUE SE VÊ. CONFIANÇA QUE SE SENTE.
          </p>
        </div>

        <Image
          alt=""
          aria-hidden="true"
          className="mobile-portfolio-transition__sparkle"
          data-mobile-transition-sparkle
          height={48}
          src="/assets/blog/dynamic-routing/mobile-transition-sparkle.svg"
          width={48}
        />

        <Image
          alt=""
          aria-hidden="true"
          className="mobile-portfolio-transition__curve"
          data-mobile-transition-curve
          height={52}
          src="/assets/blog/dynamic-routing/mobile-transition-curve.svg"
          width={390}
        />

        <a
          aria-label="Ver as transformações"
          className="mobile-portfolio-transition__scroll-link"
          data-mobile-transition-scroll-link
          href="#servicos"
        >
          <span className="sr-only">Ver as transformações</span>
          <span
            aria-hidden="true"
            className="mobile-portfolio-transition__scroll-arrow"
          />
        </a>
      </div>
    </section>
  );
}
