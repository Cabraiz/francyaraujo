"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const MarcaImage = ({ title, src, slug }: Props) => {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1000);
    };

    // Inicializa com o tamanho da janela atual
    handleResize();

    // Adiciona listener para resize da janela
    window.addEventListener("resize", handleResize);

    // Remove listener ao desmontar
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`relative w-full h-full ${isLargeScreen ? 'ms-16' : ''}`} style={{ height: '100%' }}>
      <Image
        src={src}
        alt={`Marca Image for ${title}`}
        layout="fill" // Preenche todo o contêiner pai
        objectFit="contain" // Ajusta a imagem ao tamanho do pai sem cortar
        objectPosition={isLargeScreen ? "left top" : "center"} // Alinha à esquerda em telas grandes, centraliza em telas pequenas
        className="absolute inset-0"
      />
    </div>
  );
};

export default MarcaImage;
