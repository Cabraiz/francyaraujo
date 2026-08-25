import Image from "next/image";
import { FaInstagram, FaPlay } from "react-icons/fa6";

const instagramPosts = [
  {
    date: "16 OUT 2025",
    href: "https://www.instagram.com/francyaraujocenario/reel/DP4y5-UgZqg/",
    image: "/assets/blog/dynamic-routing/instagram-francy-synthetic-01.jpg",
  },
  {
    date: "26 AGO 2025",
    href: "https://www.instagram.com/francyaraujocenario/reel/DN1_S6q2J1r/",
    image: "/assets/blog/dynamic-routing/instagram-francy-synthetic-02.jpg",
  },
  {
    date: "26 AGO 2025",
    href: "https://www.instagram.com/francyaraujocenario/reel/DN1-LohWADL/",
    image: "/assets/blog/dynamic-routing/instagram-francy-synthetic-03.jpg",
  },
  {
    date: "31 JUL 2025",
    href: "https://www.instagram.com/francyaraujocenario/reel/DMx-S27s8t8/",
    image: "/assets/blog/dynamic-routing/instagram-francy-synthetic-04.jpg",
  },
  {
    date: "30 JUL 2025",
    href: "https://www.instagram.com/francyaraujocenario/reel/DMvlUpHS9as/",
    image: "/assets/blog/dynamic-routing/instagram-francy-synthetic-05.jpg",
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
          <a
            aria-label={`Abrir transformação ${index + 1} no Instagram`}
            className="instagram-fan__card"
            data-scroll-instagram-card
            href={post.href}
            key={post.href}
            rel="noreferrer"
            target="_blank"
          >
            <Image
              alt={`Trabalho de coloração ruiva realizado por Francy Araújo, publicação ${index + 1}`}
              className="instagram-fan__image"
              fill
              sizes="(max-width: 767px) 78vw, (max-width: 1199px) 19vw, 16vw"
              src={post.image}
            />
            <span aria-hidden="true" className="instagram-fan__shine" />
            <span className="instagram-fan__meta">
              <span>
                <small>TRANSFORMAÇÃO</small>
                <strong>{String(index + 1).padStart(2, "0")}</strong>
              </span>
              <span className="instagram-fan__date">{post.date}</span>
              <span className="instagram-fan__play">
                <FaPlay aria-hidden="true" />
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
