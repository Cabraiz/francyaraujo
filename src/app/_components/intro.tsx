"use client";

import { useLayoutEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import MarcaImage from "./marca";

type Props = {
  title: string;
  coverImage: string;
};

const navItems = [
  { name: "HOME", link: "/home" },
  { name: "OUR STORY", link: "/story" },
  { name: "OUR SERVICES", link: "/services" },
  { name: "TEAM", link: "/team" },
  { name: "CONTACT", link: "/contact" },
  { name: "BOOK NOW", link: "/book" },
];

export function Intro({ title, coverImage }: Readonly<Props>) {
  const [sectionHeight, setSectionHeight] = useState<string>(isMobile ? '13vh' : '9vh'); // Valor inicial baseado na detecção de mobile

  useLayoutEffect(() => {
    const updateSectionHeight = () => {
      if (isMobile) {
        setSectionHeight('13vh');
      } else if (window.innerWidth > 1100) {
        setSectionHeight('9vh');
      } else {
        setSectionHeight('5vh');
      }
    };

    // Atualiza a altura no carregamento inicial
    updateSectionHeight();

    // Listener para atualizações na mudança de tamanho da janela
    const resizeListener = () => {
      setTimeout(updateSectionHeight, 100); // Debounce com 100ms
    };
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{
        height: sectionHeight,
        transition: 'height 0.5s ease-in-out', // Transição suave para mudanças de altura
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparência do fundo
        backdropFilter: 'blur(10px)', // Efeito de desfoque
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Sombra suave
        zIndex: 2, // Garante que o menu fique sobre a imagem
      }}
    >
      <div className="container-fluid d-flex align-items-center justify-content-between">
        {/* Marca à esquerda */}
        <MarcaImage title={title} src={coverImage} />

        {/* Itens de navegação à direita */}
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          {navItems.map((item) => (
            <li className="nav-item" key={item.name}>
              <a
                className="nav-link"
                href={item.link}
                style={{
                  fontFamily: "'Novecento', sans-serif",
                  color: '#000000b5', // Cinza claro
                  fontSize: 'auto',
                  letterSpacing: '0.4em',
                  transition: 'color 0.3s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = '#ffdfa9')} // Dourado no hover
                onMouseOut={(e) => (e.currentTarget.style.color = '#000000b5')} // Volta ao cinza
                onFocus={(e) => (e.currentTarget.style.color = '#ffdfa9')} // Dourado no foco (teclado)
                onBlur={(e) => (e.currentTarget.style.color = '#000000b5')} // Volta ao cinza quando perde o foco
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
