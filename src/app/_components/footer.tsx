import Image from "next/image";

export function Footer() {
  return (
    <footer className="cabraiz-credit" data-scroll-footer>
      <a
        aria-label="Conversar com Cabraiz pelo WhatsApp"
        className="cabraiz-credit__whatsapp-overlay"
        href="https://wa.me/5585998575707?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Francy%20Ara%C3%BAjo."
        rel="noreferrer"
        target="_blank"
      >
        <span className="cabraiz-credit__sr-only">
          Conversar com Cabraiz pelo WhatsApp
        </span>
      </a>
      <div
        aria-hidden="true"
        className="cabraiz-credit__glow"
        data-scroll-footer-glow
      />
      <div className="cabraiz-credit__inner">
        <div className="cabraiz-credit__identity" data-scroll-footer-identity>
          <Image
            alt="Logo Cabraiz"
            className="cabraiz-credit__logo"
            height="256"
            src="/assets/blog/dynamic-routing/cabraiz-monogram-black.png"
            unoptimized
            width="209"
          />
          <span className="cabraiz-credit__wordmark">
            <span className="cabraiz-credit__eyebrow">
              UMA EXPERIÊNCIA DIGITAL POR
            </span>
            <strong className="cabraiz-credit__name">CABRAIZ</strong>
          </span>
          <a
            aria-label="Visitar o site da Cabraiz"
            className="cabraiz-credit__mobile-menu"
            href="https://cabraiz.com"
            rel="noreferrer"
            target="_blank"
          >
            <span />
            <span />
            <span />
          </a>
        </div>

        <div className="cabraiz-credit__proof">
          <div className="cabraiz-credit__proof-stage">
            <section className="cabraiz-credit__intro" data-scroll-footer-copy>
              <span className="cabraiz-credit__intro-eyebrow">
                ESTRATÉGIA · DESIGN · TECNOLOGIA
              </span>
              <h2>
                SOLUÇÕES DIGITAIS
                <br />
                QUE GERAM RESULTADOS
              </h2>
              <p>
                Unimos criatividade, estratégia e tecnologia para construir
                experiências digitais que conectam marcas e pessoas.
              </p>
            </section>
            <div className="cabraiz-credit__stats-visual">
              <section
                aria-label="Indicadores da Cabraiz"
                className="cabraiz-credit__stats"
              >
                <div className="cabraiz-credit__metric">
                  <div
                    aria-hidden="true"
                    className="cabraiz-credit__metric-icon"
                  >
                    <svg aria-hidden="true" fill="none" viewBox="0 0 32 32">
                      <path d="M7 23.5h18M8.5 20l5.2-5.3 4 3.4L24 10.5" />
                      <path d="M20 10.5h4v4" />
                    </svg>
                  </div>
                  <strong>+120</strong>
                  <span>
                    PROJETOS
                    <br />
                    ENTREGUES
                  </span>
                </div>
                <div className="cabraiz-credit__metric">
                  <div
                    aria-hidden="true"
                    className="cabraiz-credit__metric-icon"
                  >
                    <svg aria-hidden="true" fill="none" viewBox="0 0 32 32">
                      <circle cx="16" cy="16" r="9" />
                      <path d="M12 14h.01M20 14h.01M12.5 19c2 2.2 5 2.2 7 0" />
                    </svg>
                  </div>
                  <strong>98%</strong>
                  <span>
                    SATISFAÇÃO
                    <br />
                    DOS CLIENTES
                  </span>
                </div>
                <div className="cabraiz-credit__metric">
                  <div
                    aria-hidden="true"
                    className="cabraiz-credit__metric-icon"
                  >
                    <svg aria-hidden="true" fill="none" viewBox="0 0 32 32">
                      <path d="m16 6 3 6.1 6.7 1-4.9 4.7 1.2 6.7-6-3.2-6 3.2 1.2-6.7-4.9-4.7 6.7-1L16 6Z" />
                    </svg>
                  </div>
                  <strong>+12 ANOS</strong>
                  <span>
                    DE
                    <br />
                    EXPERIÊNCIA
                  </span>
                </div>
                <div className="cabraiz-credit__metric">
                  <div
                    aria-hidden="true"
                    className="cabraiz-credit__metric-icon"
                  >
                    <svg aria-hidden="true" fill="none" viewBox="0 0 32 32">
                      <circle cx="16" cy="16" r="9" />
                      <path d="M7 16h18M16 7c2 2.5 3 5.5 3 9s-1 6.5-3 9c-2-2.5-3-5.5-3-9s1-6.5 3-9Z" />
                    </svg>
                  </div>
                  <strong>4</strong>
                  <span>
                    PAÍSES
                    <br />
                    ATENDIDOS
                  </span>
                </div>
              </section>
            </div>
            <div aria-hidden="true" className="cabraiz-credit__mascot">
              <Image
                alt=""
                className="cabraiz-credit__mascot-image"
                height="640"
                sizes="7rem"
                src="/assets/blog/dynamic-routing/cabraiz-mascot-v1.webp"
                width="640"
              />
            </div>
            <nav
              aria-label="Atalhos da Cabraiz"
              className="cabraiz-credit__speech-balloon"
            >
              <a
                aria-label="Abrir o site da Cabraiz"
                href="https://cabraiz.com"
                rel="noreferrer"
                target="_blank"
              >
                <svg
                  aria-hidden="true"
                  className="cabraiz-credit__globe"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c2.1 2.45 3.2 5.45 3.2 9S14.1 18.55 12 21c-2.1-2.45-3.2-5.45-3.2-9S9.9 5.45 12 3Z" />
                </svg>
                <span className="cabraiz-credit__speech-copy">
                  <small>VISIT THE</small>
                  <strong>SITE</strong>
                </span>
              </a>
              <a
                aria-label="Conversar com Cabraiz pelo WhatsApp"
                href="https://wa.me/5585998575707?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Francy%20Ara%C3%BAjo."
                rel="noreferrer"
                target="_blank"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M12.04 2a9.84 9.84 0 0 0-8.46 14.86L2 22l5.28-1.53A9.96 9.96 0 1 0 12.04 2Zm0 17.79a7.76 7.76 0 0 1-3.96-1.09l-.28-.16-3.13.91.93-3.05-.18-.29a7.72 7.72 0 1 1 6.62 3.68Zm4.25-5.8c-.23-.12-1.38-.68-1.6-.75-.21-.08-.37-.12-.52.11-.16.24-.61.76-.74.92-.14.15-.28.17-.51.05a6.34 6.34 0 0 1-1.88-1.16 7.07 7.07 0 0 1-1.3-1.62c-.14-.23-.01-.36.1-.48l.35-.41c.12-.14.16-.24.24-.39.08-.16.04-.3-.02-.41-.06-.12-.52-1.27-.72-1.74-.19-.45-.38-.39-.52-.4h-.45c-.15 0-.41.06-.62.29-.22.24-.82.8-.82 1.95 0 1.15.84 2.26.95 2.42.12.15 1.65 2.51 4 3.52.56.24.99.38 1.33.49.56.18 1.07.15 1.47.09.45-.06 1.38-.56 1.58-1.11.19-.55.19-1.01.13-1.11-.06-.09-.22-.15-.45-.27Z" />
                </svg>
                <span className="cabraiz-credit__speech-copy">
                  <small>MESSAGE ON</small>
                  <strong>WHATSAPP</strong>
                </span>
              </a>
            </nav>
          </div>

          <div className="cabraiz-credit__signature-visual">
            <div
              className="cabraiz-credit__signature"
              data-scroll-footer-signature
            >
              <span>PROJETO E DESENVOLVIMENTO · CABRAIZ.COM</span>
              <span aria-hidden="true" className="cabraiz-credit__separator">
                ·
              </span>
              <a
                aria-label="Abrir Instagram da Cabraiz"
                href="https://www.instagram.com/cabraiz/"
                rel="noreferrer"
                target="_blank"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M7.8 2h8.4A5.81 5.81 0 0 1 22 7.8v8.4a5.81 5.81 0 0 1-5.8 5.8H7.8A5.81 5.81 0 0 1 2 16.2V7.8A5.81 5.81 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
                </svg>
                <span>@cabraiz</span>
              </a>
              <a
                aria-label="Conversar com Cabraiz pelo WhatsApp"
                href="https://wa.me/5585998575707?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Francy%20Ara%C3%BAjo."
                rel="noreferrer"
                target="_blank"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M12.04 2a9.84 9.84 0 0 0-8.46 14.86L2 22l5.28-1.53A9.96 9.96 0 1 0 12.04 2Zm0 17.79a7.76 7.76 0 0 1-3.96-1.09l-.28-.16-3.13.91.93-3.05-.18-.29a7.72 7.72 0 1 1 6.62 3.68Zm4.25-5.8c-.23-.12-1.38-.68-1.6-.75-.21-.08-.37-.12-.52.11-.16.24-.61.76-.74.92-.14.15-.28.17-.51.05a6.34 6.34 0 0 1-1.88-1.16 7.07 7.07 0 0 1-1.3-1.62c-.14-.23-.01-.36.1-.48l.35-.41c.12-.14.16-.24.24-.39.08-.16.04-.3-.02-.41-.06-.12-.52-1.27-.72-1.74-.19-.45-.38-.39-.52-.4h-.45c-.15 0-.41.06-.62.29-.22.24-.82.8-.82 1.95 0 1.15.84 2.26.95 2.42.12.15 1.65 2.51 4 3.52.56.24.99.38 1.33.49.56.18 1.07.15 1.47.09.45-.06 1.38-.56 1.58-1.11.19-.55.19-1.01.13-1.11-.06-.09-.22-.15-.45-.27Z" />
                </svg>
                <span>+55 85 99857-5707</span>
              </a>
            </div>
          </div>
        </div>

        <div className="cabraiz-credit__action" data-scroll-footer-cta>
          <div aria-hidden="true" className="cabraiz-credit__mountain">
            <Image
              alt=""
              fill
              sizes="(max-width: 680px) 50vw, 9rem"
              src="/assets/blog/dynamic-routing/cabraiz-mountain-generated.webp"
              unoptimized
            />
          </div>
          <a
            aria-label="Conversar com Cabraiz pelo WhatsApp"
            className="cabraiz-credit__cta"
            href="https://wa.me/5585998575707?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Francy%20Ara%C3%BAjo."
            rel="noreferrer"
            target="_blank"
          >
            <span aria-hidden="true" className="cabraiz-credit__arrow">
              ↗
            </span>
            <span className="cabraiz-credit__cta-label">
              FALE COM<strong>CABRAIZ</strong>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
