import Image from "next/image";
import type { CSSProperties } from "react";

export const SignaturePost = () => {
  const containerStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    minHeight: "max(48vh, 25rem)",
    padding: 0,
    boxSizing: "border-box",
    textAlign: "center",
    backgroundColor: "#f3dfd7",
    scrollMarginTop: "var(--site-header-height)",
    overflow: "hidden",
    isolation: "isolate",
  };

  const backgroundTextStyle: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: 0,
    transform: "translateY(-50%)",
    fontFamily: "Holligate, sans-serif",
    fontSize: "clamp(6rem, 15cqw, 12rem)",
    color: "rgba(140, 38, 53, 0.075)",
    zIndex: 1,
    whiteSpace: "nowrap",
    width: "100%",
    textAlign: "center",
    pointerEvents: "none",
  };

  const foregroundTextStyle: CSSProperties = {
    position: "relative",
    zIndex: 2,
    fontFamily: "Times New Roman, serif",
    color: "#5f4542",
    maxWidth: "1200px",
    textAlign: "center", // Centraliza o texto horizontalmente
    display: "flex",
    width: "min(100%, 68rem)",
    flexDirection: "column",
    justifyContent: "center", // Centraliza verticalmente
    alignItems: "center",
  };

  const headingStyle: CSSProperties = {
    fontSize: "5vh",
    fontWeight: "bold",
    fontFamily: "Elegant , Georgia, serif",
    marginBottom: "2vh",
    marginTop: "2vh",
    letterSpacing: "15px",
    wordWrap: "break-word",
    lineHeight: "40px",
    color: "#963847",
  };

  const subHeadingStyle: CSSProperties = {
    fontSize: "18px",
    fontFamily: "Arial, sans-serif",
    letterSpacing: "7px",
    wordWrap: "break-word",
    color: "#963847",
  };

  const paragraphStyle: CSSProperties = {
    fontSize: "clamp(0.98rem, 1.05vw, 1.08rem)",
    fontFamily: 'Georgia, "Times New Roman", serif',
    marginTop: "clamp(1.25rem, 2.5vh, 2rem)",
    maxWidth: "52rem",
    wordWrap: "break-word",
    letterSpacing: "0.01em",
    wordSpacing: "normal",
    lineHeight: 1.75,
    textAlign: "center",
  };

  const locationStyle: CSSProperties = {
    fontWeight: "bold",
    color: "#762a38",
  };

  return (
    <section
      className="signature-post"
      data-scroll-signature
      id="historia"
      style={containerStyle}
    >
      <div className="signature-post__scene" aria-hidden="true">
        <Image
          src="/assets/blog/dynamic-routing/signature-architecture-v2.avif"
          alt=""
          fill
          sizes="(min-width: 1100px) 22vw, (min-width: 768px) 30vw, 0px"
          className="signature-post__scene-image"
          data-scroll-signature-architecture
        />

        <div
          className="signature-post__scene-layer signature-post__scene-layer--table"
          data-scroll-signature-table
        >
          <Image
            alt=""
            className="signature-post__scene-object"
            fill
            sizes="(min-width: 768px) 9vw, 0px"
            src="/assets/blog/dynamic-routing/signature-table-v1.webp"
          />
        </div>

        <div
          className="signature-post__scene-layer signature-post__scene-layer--vase"
          data-scroll-signature-vase
        >
          <Image
            alt=""
            className="signature-post__scene-object"
            fill
            sizes="(min-width: 768px) 14vw, 0px"
            src="/assets/blog/dynamic-routing/signature-vase-v1.webp"
          />
        </div>

        <div
          className="signature-post__scene-layer signature-post__scene-layer--chair"
          data-scroll-signature-chair
        >
          <Image
            alt=""
            className="signature-post__scene-object"
            fill
            sizes="(min-width: 768px) 16vw, 0px"
            src="/assets/blog/dynamic-routing/signature-chair-v1.webp"
          />
        </div>
      </div>

      <div className="signature-post__content" data-scroll-signature-panel>
        {/* Assinatura limitada ao painel direito */}
        <div data-scroll-signature-bg style={backgroundTextStyle}>
          Francy Araujo
        </div>

        {/* Texto da frente */}
        <div data-scroll-signature-foreground style={foregroundTextStyle}>
          <p data-scroll-signature-reveal style={subHeadingStyle}>
            THE
          </p>
          <h2 data-scroll-signature-reveal style={headingStyle}>
            FRANCY ARAÚJO
          </h2>
          <p data-scroll-signature-reveal style={subHeadingStyle}>
            SALON
          </p>
          <p
            data-scroll-signature-reveal
            style={{
              ...paragraphStyle,
              scrollMarginTop: "var(--site-header-height)",
            }}
          >
            No espaço da cabeleireira Francy Araújo, localizado na{" "}
            <span style={locationStyle}>Rua Israel Bezerra, 46</span>, em{" "}
            <span style={locationStyle}>Dionísio Torres, Fortaleza</span>, você
            encontra uma experiência exclusiva de hair stylist especializada em
            cabelos ruivos, com cortes, colorações e tratamentos modernos. Os
            atendimentos são personalizados e realizados somente com hora
            marcada. Manicure e depilação também estão disponíveis mediante
            solicitação antecipada.
          </p>
        </div>
      </div>
    </section>
  );
};
