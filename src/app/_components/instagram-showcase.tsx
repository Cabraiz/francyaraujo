import Image from "next/image";
import type { CSSProperties } from "react";
import { FaInstagram, FaPlay } from "react-icons/fa6";
import faceLayout from "@/app/_data/instagram-face-layout.json";

const instagramPosts = [
  {
    afterImage:
      "/assets/blog/dynamic-routing/instagram-francy-synthetic-01.avif",
    beforeImage: "/assets/blog/dynamic-routing/instagram-francy-before-01.avif",
    sceneImage: "/assets/blog/dynamic-routing/instagram-francy-scene-01.avif",
    faceLayout: faceLayout.photos["01"].layout,
    faceSource: faceLayout.photos["01"].face.source,
  },
  {
    afterImage:
      "/assets/blog/dynamic-routing/instagram-francy-synthetic-02.avif",
    beforeImage: "/assets/blog/dynamic-routing/instagram-francy-before-02.avif",
    sceneImage: "/assets/blog/dynamic-routing/instagram-francy-scene-02.avif",
    faceLayout: faceLayout.photos["02"].layout,
    faceSource: faceLayout.photos["02"].face.source,
  },
  {
    afterImage:
      "/assets/blog/dynamic-routing/instagram-francy-synthetic-03.avif",
    beforeImage: "/assets/blog/dynamic-routing/instagram-francy-before-03.avif",
    sceneImage: "/assets/blog/dynamic-routing/instagram-francy-scene-03.avif",
    faceLayout: faceLayout.photos["03"].layout,
    faceSource: faceLayout.photos["03"].face.source,
  },
  {
    afterImage:
      "/assets/blog/dynamic-routing/instagram-francy-synthetic-04.avif",
    beforeImage: "/assets/blog/dynamic-routing/instagram-francy-before-04.avif",
    sceneImage: "/assets/blog/dynamic-routing/instagram-francy-scene-04.avif",
    faceLayout: faceLayout.photos["04"].layout,
    faceSource: faceLayout.photos["04"].face.source,
  },
  {
    afterImage:
      "/assets/blog/dynamic-routing/instagram-francy-synthetic-05.avif",
    beforeImage: "/assets/blog/dynamic-routing/instagram-francy-before-05.avif",
    sceneImage: "/assets/blog/dynamic-routing/instagram-francy-scene-05.avif",
    faceLayout: faceLayout.photos["05"].layout,
    faceSource: faceLayout.photos["05"].face.source,
  },
] as const;

const instagramProfileUrl = "https://www.instagram.com/francyaraujocenario/";

function getFaceStyle(post: (typeof instagramPosts)[number]) {
  return {
    "--instagram-face-image-height": `${post.faceLayout.imageHeightPercent}%`,
    "--instagram-face-shift-x": `${post.faceLayout.translateXPercent}%`,
    "--instagram-face-shift-y": `${post.faceLayout.translateYPercent}%`,
    "--instagram-face-target-x": `${faceLayout.target.centerX * 100}%`,
    "--instagram-face-target-y": `${faceLayout.target.centerY * 100}%`,
  } as CSSProperties;
}

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
          <a
            aria-label={`Ver a transformação ${index + 1} no Instagram da Francy Araújo`}
            className="instagram-fan__card"
            data-scroll-instagram-card
            href={instagramProfileUrl}
            key={post.afterImage}
            rel="noreferrer"
            target="_blank"
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
                  <span
                    aria-hidden="true"
                    className="instagram-fan__depth-background"
                    data-scroll-instagram-background
                  >
                    <Image
                      alt=""
                      className="instagram-fan__image instagram-fan__image--background instagram-fan__image--expanded"
                      height={640}
                      sizes="(max-width: 767px) 100vw, (max-width: 1199px) 19vw, 16vw"
                      src={post.sceneImage}
                      style={getFaceStyle(post)}
                      width={960}
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    className="instagram-fan__depth-subject"
                    data-scroll-instagram-subject
                  >
                    <span className="instagram-fan__subject-frame">
                      <Image
                        alt=""
                        className="instagram-fan__image instagram-fan__image--expanded instagram-fan__image--foreground instagram-fan__image--subject"
                        height={post.faceSource.height}
                        sizes="(max-width: 767px) 100vw, (max-width: 1199px) 19vw, 16vw"
                        src={post.afterImage}
                        style={getFaceStyle(post)}
                        width={post.faceSource.width}
                      />
                    </span>
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
          </a>
        ))}
      </div>
    </section>
  );
}
