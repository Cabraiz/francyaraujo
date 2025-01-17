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
  { name: "AGENDE AGORA", link: "/book" },
];

export function Intro({ title, coverImage }: Readonly<Props>) {
  const [sectionHeight, setSectionHeight] = useState<string>(isMobile ? '13vh' : '9vh');
  const [isMounted, setIsMounted] = useState(false);
  const [currentPath, setCurrentPath] = useState(''); 
  const [showNavItems, setShowNavItems] = useState(true); 
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true); 
    setCurrentPath(pathname ?? '');

    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setShowNavItems(false);
      } else {
        setShowNavItems(true);
      }
    };

    handleResize();
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
      className="navbar navbar-expand-lg navbar-light fade-in"
      style={{
        height: sectionHeight,
        transition: 'height 0.5s ease-in-out',
        background: window.innerWidth < 1000 
          ? 'linear-gradient(to bottom, #f76852 10%, #f76852 90%)'
          : 'linear-gradient(to bottom, #fdb4a6 0%,#f88b75 5%, #f76852  10%, #f76852  85%, #f88b75 95%,#fdb4a6 100%)',
        border: '1px solid rgba(255, 255, 255, 0.15)', // Bordas mais suaves
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)', // Sombra um pouco mais leve
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
          background: window.innerWidth < 1000 
            ? 'linear-gradient(to right, #f76852 10%, #f76852 90%)'
            : 'linear-gradient(to right, #f78670 0%, #f76852 90%,#f76852 100%)',
          zIndex: -1,
        }}
      />
      
      <div
        style={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(255, 228, 225, 0.4), rgba(255, 228, 225, 0))', // Cor creme no lugar do branco
          opacity: 0.7,
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

      <div className="particles" />

      <div className="container-fluid h-100 d-flex justify-content-center align-items-center px-0">
        <div className={`row w-100 align-items-center ${showNavItems ? 'justify-content-between' : 'justify-content-center'} h-100`}>

          <div className={`col-${showNavItems ? '4' : '12'} d-flex justify-content-${showNavItems ? 'start' : 'center'} align-items-center h-100`}>
            <MarcaImage title={title} src={coverImage} />
          </div>

          {showNavItems && (
            <div className="col-8 d-flex justify-content-end align-items-center h-100">
              <ul className="navbar-nav mb-2 mb-lg-0 mt-2">
                {navItems.map((item) => (
                  <li className="nav-item mx-3" key={item.name}>
                    <a
                      className={`nav-link ${currentPath === item.link ? 'active' : 'gradient-animation'} ${item.name === 'AGENDE AGORA' ? 'highlight-agenda' : ''}`}
                      href={item.link}
                      style={{
                        fontFamily: "'Novecento', sans-serif",
                        fontSize: item.name === 'AGENDE AGORA' ? '1.1em' : 'auto',  
                        letterSpacing: '0.4em',
                        transition: 'color 0.3s ease, letter-spacing 0.4s ease',
                        whiteSpace: 'nowrap',
                        color: currentPath === item.link ? '#ffffff' : 'rgba(255, 228, 225, 0.8)', // Cor creme no lugar do branco
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
