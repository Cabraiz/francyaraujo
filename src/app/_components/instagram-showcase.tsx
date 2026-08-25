import Image from "next/image";
import { FaInstagram, FaPlay } from "react-icons/fa6";

const instagramPosts = [
  {
    afterImage:
      "/assets/blog/dynamic-routing/instagram-francy-synthetic-01.avif",
    beforeImage: "/assets/blog/dynamic-routing/instagram-francy-before-01.avif",
  },
  {
    afterImage:
      "/assets/blog/dynamic-routing/instagram-francy-synthetic-02.avif",
    beforeImage: "/assets/blog/dynamic-routing/instagram-francy-before-02.avif",
  },
  {
    afterImage:
      "/assets/blog/dynamic-routing/instagram-francy-synthetic-03.avif",
    beforeImage: "/assets/blog/dynamic-routing/instagram-francy-before-03.avif",
  },
  {
    afterImage:
      "/assets/blog/dynamic-routing/instagram-francy-synthetic-04.avif",
    beforeImage: "/assets/blog/dynamic-routing/instagram-francy-before-04.avif",
  },
  {
    afterImage:
      "/assets/blog/dynamic-routing/instagram-francy-synthetic-05.avif",
    beforeImage: "/assets/blog/dynamic-routing/instagram-francy-before-05.avif",
  },
] as const;

export function InstagramShowcase() {
  return (
    <section
      aria-labelledby="instagram-showcase-title"
      className="instagram-showcase"
      data-scroll-instagram
      id="servicos"
    >
      <div aria-hidden="true" className="instagram-showcase__halo" />
      <header className="instagram-showcase__header" data-scroll-instagram-copy>
        <div>
          <p className="instagram-showcase__eyebrow">
            SERVIÇOS · PORTFÓLIO VIVO
          </p>
          <h2 id="instagram-showcase-title">
            Transformações que
            <span> falam por si.</span>
          </h2>
        </div>
        <div className="instagram-showcase__intro">
          <p>
            Uma seleção dos trabalhos mais recentes publicados por Francy,
            especialista em ruivos e visagismo.
          </p>
          <a
            href="https://www.instagram.com/francyaraujocenario/"
            rel="noreferrer"
            target="_blank"
          >
            <FaInstagram aria-hidden="true" />
            <span>VER PERFIL COMPLETO</span>
          </a>
        </div>
      </header>

      <div className="instagram-fan">
        {instagramPosts.map((post, index) => (
          <article
            aria-label={`Transformação ${index + 1}: do cabelo escuro ao ruivo`}
            className="instagram-fan__card"
            data-scroll-instagram-card
            key={post.afterImage}
          >
            <div
              className="instagram-fan__card-stage"
              data-scroll-instagram-stage
            >
              <div
                aria-hidden="true"
                className="instagram-fan__card-inner"
                data-scroll-instagram-flip
              >
                <div className="instagram-fan__face instagram-fan__face--before">
                  <span className="instagram-fan__subject-frame">
                    <Image
                      alt=""
                      className="instagram-fan__image instagram-fan__image--portrait instagram-fan__image--subject"
                      fill
                      sizes="(max-width: 767px) 82vw, (max-width: 1199px) 19vw, 16vw"
                      src={post.beforeImage}
                    />
                  </span>
                  <span className="instagram-fan__shine" />
                  <span className="instagram-fan__meta">
                    <span>
                      <small>ANTES</small>
                      <strong>{String(index + 1).padStart(2, "0")}</strong>
                    </span>
                    <span className="instagram-fan__date">COR NATURAL</span>
                    <span className="instagram-fan__play">
                      <FaPlay />
                    </span>
                  </span>
                </div>
                <div className="instagram-fan__face instagram-fan__face--after">
                  <span className="instagram-fan__subject-frame">
                    <Image
                      alt=""
                      className="instagram-fan__image instagram-fan__image--expanded instagram-fan__image--subject"
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 1199px) 19vw, 16vw"
                      src={post.afterImage}
                    />
                  </span>
                  <span className="instagram-fan__shine" />
                  <span className="instagram-fan__meta">
                    <span>
                      <small>RUIVO</small>
                      <strong>{String(index + 1).padStart(2, "0")}</strong>
                    </span>
                    <span className="instagram-fan__date">RESULTADO</span>
                    <span className="instagram-fan__play">
                      <FaPlay />
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
