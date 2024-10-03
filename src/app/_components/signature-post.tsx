import React from 'react';

export const SignaturePost: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '46vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    backgroundColor: '#FF6F61',
  };

  const backgroundTextStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontFamily: 'Holligate, sans-serif',
    fontSize: '14vw',
    color: 'rgba(0, 0, 0, 0.05)',
    zIndex: 1,
    whiteSpace: 'nowrap',
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    pointerEvents: 'none',
  };

  const foregroundTextStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 2,
    fontFamily: 'Times New Roman, serif',
    color: 'black',
    maxWidth: '1200px',
    textAlign: 'center', // Centraliza o texto dentro do container
  };

  const headingStyle: React.CSSProperties = {
    fontSize: '5vh',
    fontWeight: 'bold',
    fontFamily: 'Elegant , Georgia, serif',
    marginBottom: '2vh',
    marginTop: '2vh',
    letterSpacing: '15px',
    wordWrap: 'break-word',
    lineHeight: '40px',
  };

  const subHeadingStyle: React.CSSProperties = {
    fontSize: '18px',
    fontFamily: 'Arial, sans-serif',
    letterSpacing: '7px',
    wordWrap: 'break-word',
  };

  const paragraphStyle: React.CSSProperties = {
    fontSize: '16px',
    fontFamily: 'Thenat, sans-serif',
    marginTop: '1vh',
    maxWidth: '90%', // Expande o parágrafo
    wordWrap: 'break-word',
    letterSpacing: '3px',
    wordSpacing: '4px',
    lineHeight: '35px',
    textAlign: 'center', // Garante que o texto fique centralizado
  };

  const locationStyle: React.CSSProperties = {
    fontWeight: 'bold',
    color: 'black',
  };

  return (
    <div style={containerStyle}>
      {/* Texto de fundo grande */}
      <div style={backgroundTextStyle}>Francy Araujo</div>

      {/* Texto da frente */}
      <div style={foregroundTextStyle}>
        <h2 style={subHeadingStyle}>THE</h2>
        <h1 style={headingStyle}>FRANCY ARAÚJO</h1>
        <h2 style={subHeadingStyle}>SALON</h2>
        <p style={paragraphStyle}>
          localizado na <span style={locationStyle}>Aldeota</span>, em <span style={locationStyle}>Fortaleza</span>, oferecemos uma experiência exclusiva com serviços de qualidade. Nossa equipe realiza cortes, colorações e tratamentos modernos com atendimento personalizado. Bem-vindo ao salão, onde sua beleza é prioridade.
        </p>
      </div>
    </div>
  );
};
