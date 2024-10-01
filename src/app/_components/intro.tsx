"use client";

import { useLayoutEffect, useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import MarcaImage from "./marca";
import { usePathname } from 'next/navigation';

type Props = {
  title: string;
  coverImage: string;
};

const navItems = [
  { name: "HOME", link: "/" },
  { name: "HISTÓRIA", link: "/story" },
  { name: "SERVIÇOS", link: "/services" },
  { name: "CONTATOS", link: "/contact" },
  { name: "AGENDE AGORA!", link: "/book" },
];

export function Intro({ title, coverImage }: Readonly<Props>) {
  const [sectionHeight, setSectionHeight] = useState<string>(isMobile ? '13vh' : '9vh');
  const [isMounted, setIsMounted] = useState(false); // Adicionado para garantir montagem
  const [currentPath, setCurrentPath] = useState(''); // Estado para armazenar a rota
  const pathname = usePathname(); // Usa o hook usePathname para obter a rota atual

  useEffect(() => {
    setIsMounted(true); // Marca o componente como montado
    setCurrentPath(pathname); // Define a rota atual
  }, [pathname]);

  useLayoutEffect(() => {
    const updateSectionHeight = () => {
      if (isMobile) {
        setSectionHeight('13vh');
      } else if (window.innerWidth > 1200) {
        setSectionHeight('9vh');
      } else {
        setSectionHeight('9vh');
      }
    };

    updateSectionHeight();
    const resizeListener = () => {
      setTimeout(updateSectionHeight, 100); // Debounce com 100ms
    };
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  if (!isMounted) {
    return null; // Retorna nulo até o componente estar montado no client-side
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{
        height: sectionHeight,
        transition: 'height 0.5s ease-in-out',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(15px) brightness(1.3) contrast(1.2)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
        zIndex: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0))',
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          height: '70%',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%',
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-fluid h-100">
        <div className="row w-100 align-items-center justify-content-between h-100">
          
          {/* Marca à esquerda, ocupando 30% e com altura total */}
          <div className="col-4 d-flex justify-content-start align-items-center h-100">
            <MarcaImage title={title} src={coverImage} />
          </div>

          {/* Itens de navegação à direita, ocupando 70% */}
          <div className="col-8 d-flex justify-content-end align-items-center h-100">
            <ul className="navbar-nav mb-2 mb-lg-0 mt-2">
              {navItems.map((item) => (
                <li className="nav-item mx-1" key={item.name}> {/* Adiciona margem horizontal a cada nav-item */}
                  <a
                    className={`nav-link ${currentPath === item.link ? 'gradient-animation' : ''}`}
                    href={item.link}
                    style={{
                      fontFamily: "'Novecento', sans-serif",
                      color: currentPath === item.link ? 'transparent' : '#000000b5',
                      fontSize: 'auto',
                      letterSpacing: '0.4em',
                      transition: 'color 0.3s ease',
                      whiteSpace: 'nowrap', // Evita quebra de linha no texto
                    }}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
