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
  const [isMounted, setIsMounted] = useState(false);
  const [currentPath, setCurrentPath] = useState(''); 
  const [showNavItems, setShowNavItems] = useState(true); // Estado para controlar a exibição dos nav items
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true); 
    setCurrentPath(pathname);

    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setShowNavItems(false); // Esconder itens de navegação se a largura for menor que 1000px
      } else {
        setShowNavItems(true); // Mostrar itens de navegação se a largura for maior que 1000px
      }
    };

    handleResize(); // Chama inicialmente para definir o estado correto

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [pathname]);

  useLayoutEffect(() => {
    const updateSectionHeight = () => {
      if (isMobile) {
        setSectionHeight('12vh');
      } else if (window.innerWidth > 1200) {
        setSectionHeight('9vh');
      } else {
        setSectionHeight('9vh');
      }
    };

    updateSectionHeight();
    const resizeListener = () => {
      setTimeout(updateSectionHeight, 100); 
    };
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  if (!isMounted) {
    return null; 
  }

  return (
   <nav
  className="navbar navbar-expand-lg navbar-light"
  style={{
    height: sectionHeight,
    transition: 'height 0.5s ease-in-out',
    background: 'linear-gradient(to bottom, #fdb4a6 0%,#f88b75 5%, #f76852  10%, #f76852  85%, #f88b75 95%,#fdb4a6 100%)',
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
        background: 'linear-gradient(to right, #f78670 0%, #f78670 5%, #f76852 10%, #f76852 90%,#f78670 95%, #f78670 100%)',
        zIndex: -1, // Coloca o gradiente atrás do conteúdo do nav
      }}
    />
    {/* Seu conteúdo de navegação aqui */}
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

      <div className="container-fluid h-100 d-flex justify-content-center align-items-center px-0">
        <div className={`row w-100 align-items-center ${showNavItems ? 'justify-content-between' : 'justify-content-center'} h-100`}>

          
          {/* Marca centralizada se os navItems estiverem ocultos */}
          <div className={`col-${showNavItems ? '4' : '12'} d-flex justify-content-${showNavItems ? 'start' : 'center'} align-items-center h-100`}>
            <MarcaImage title={title} src={coverImage} />
          </div>

          {/* Itens de navegação à direita, apenas se showNavItems for true */}
          {showNavItems && (
            <div className="col-8 d-flex justify-content-end align-items-center h-100">
              <ul className="navbar-nav mb-2 mb-lg-0 mt-2">
                {navItems.map((item) => (
                  <li className="nav-item mx-1" key={item.name}>
                    <a
                      className={`nav-link ${currentPath === item.link ? 'gradient-animation' : ''}`}
                      href={item.link}
                      style={{
                        fontFamily: "'Novecento', sans-serif",
                        color: currentPath === item.link ? 'transparent' : '#000000b5',
                        fontSize: 'auto',
                        letterSpacing: '0.4em',
                        transition: 'color 0.3s ease',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
