import type { CSSProperties } from "react";

export const SignaturePost = () => {
  const containerStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    height: "48vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "column",
    backgroundColor: "#FF6F61",
    scrollMarginTop: "var(--site-header-height)",
  };

  const backgroundTextStyle: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: 0,
    transform: "translateY(-50%)",
    fontFamily: "Holligate, sans-serif",
    fontSize: "14vw",
    color: "rgba(0, 0, 0, 0.07)",
    zIndex: 1,
    whiteSpace: "nowrap",
    width: "100%",
    textAlign: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    pointerEvents: "none",
  };

  const foregroundTextStyle: CSSProperties = {
    position: "relative",
    zIndex: 2,
    fontFamily: "Times New Roman, serif",
    color: "black",
    maxWidth: "1200px",
    textAlign: "center", // Centraliza o texto horizontalmente
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // Centraliza verticalmente
    alignItems: "center",
    height: "100%", // Garante que o conteúdo ocupe toda a altura disponível
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
  };

  const subHeadingStyle: CSSProperties = {
    fontSize: "18px",
    fontFamily: "Arial, sans-serif",
    letterSpacing: "7px",
    wordWrap: "break-word",
  };

  const paragraphStyle: CSSProperties = {
    fontSize: "16px",
    fontFamily: "Thenat, sans-serif",
    marginTop: "1vh",
    maxWidth: "90%",
    wordWrap: "break-word",
    letterSpacing: "3px",
    wordSpacing: "4px",
    lineHeight: "35px",
    textAlign: "center",
  };

  const locationStyle: CSSProperties = {
    fontWeight: "bold",
    color: "black",
  };

  return (
    <section data-scroll-signature id="historia" style={containerStyle}>
      {/* Texto de fundo grande */}
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
          id="servicos"
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
          atendimentos são personalizados e realizados somente com hora marcada.
          Manicure e depilação também estão disponíveis mediante solicitação
          antecipada.
        </p>
      </div>
    </section>
  );
};
