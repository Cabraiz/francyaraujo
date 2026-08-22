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
    <section data-scroll-signature style={containerStyle}>
      {/* Texto de fundo grande */}
      <div data-scroll-signature-bg style={backgroundTextStyle}>
        Francy Araujo
      </div>

      {/* Texto da frente */}
      <div data-scroll-signature-foreground style={foregroundTextStyle}>
        <h2 data-scroll-signature-reveal style={subHeadingStyle}>
          THE
        </h2>
        <h1 data-scroll-signature-reveal style={headingStyle}>
          FRANCY ARAÚJO
        </h1>
        <h2 data-scroll-signature-reveal style={subHeadingStyle}>
          SALON
        </h2>
        <p data-scroll-signature-reveal style={paragraphStyle}>
          localizado na <span style={locationStyle}>Aldeota</span>, em{" "}
          <span style={locationStyle}>Fortaleza</span>, oferecemos uma
          experiência exclusiva. Realizamos cortes, colorações e tratamentos
          modernos com atendimento personalizado. Bem-vindo ao salão, onde sua
          beleza é prioridade.
        </p>
      </div>
    </section>
  );
};
