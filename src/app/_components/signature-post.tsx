import React from 'react';

export const SignaturePost: React.FC = () => {
  // Estilos do container principal
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '46vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    backgroundColor: '#FF6F61', // cor de fundo
  };

  // Texto de fundo grande, ajustando a altura para 100%
    const backgroundTextStyle: React.CSSProperties = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Holligate, sans-serif', // Fonte para o fundo
        fontSize: '14vw', // Ajuste da fonte proporcional à largura da tela
        color: 'rgba(0, 0, 0, 0.05)', // Baixa opacidade
        zIndex: 1,
        whiteSpace: 'nowrap',
        width: '100%', // Ocupa 100% da largura
        overflow: 'hidden',
        textOverflow: 'ellipsis', // Se precisar cortar o texto
        pointerEvents: 'none', // Impede interação com o texto de fundo
    };


  // Estilos para o texto em primeiro plano (título e parágrafos)
  const foregroundTextStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 2,
    fontFamily: 'Times New Roman, serif',
    color: 'black',
    maxWidth: '800px',
  };

  // Estilo do título principal
  const headingStyle: React.CSSProperties = {
    fontSize: '3vw', // Ajustado para destacar mais
    fontWeight: 'bold',
    fontFamily: 'Elegant , Georgia, serif', // Fonte para o título
    marginBottom: '1vh',
    marginTop: '1vh',
    letterSpacing: '20px'

  };

  // Estilo da legenda logo abaixo do título principal
  const subHeadingStyle: React.CSSProperties = {
    fontSize: '18px',
    fontFamily: 'Arial, sans-serif', // Outra fonte para o subtítulo
    letterSpacing: '7px',
    whiteSpace: 'nowrap',
  };

  // Estilo para o parágrafo
  const paragraphStyle: React.CSSProperties = {
    fontSize: '16px',
    fontFamily: 'Verdana, sans-serif', // Fonte diferente para o corpo do texto
    marginTop: '10px',
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
          is a full-service salon located in West Hollywood, California founded by its namesake,
          celebrated hair stylist Francy Araújo. It is here that we welcome you to familiarize
          yourself with our team of artists and the extensive services we offer.
        </p>
      </div>
    </div>
  );
};
