"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Props = {
  title: string;
  coverImage: string;
  salaoImage: string;
  slug: string;
};

export function HeroPost({
  title,
  coverImage,
  salaoImage,
  slug,
}: Readonly<Props>) {
  const [isCoverImage, setIsCoverImage] = useState(true);
  const [startPosition, setStartPosition] = useState<string>(""); // Define o ponto inicial do zoom
  const [isImageLoaded, setIsImageLoaded] = useState(false); // Controle de carregamento de imagens
  const [isZoomed, setIsZoomed] = useState(true); // Garantir que comece com zoom

  // Função que retorna uma posição aleatória para o início do zoom
  const getRandomPosition = () => {
    const positions = ["top-left", "top-right", "bottom-left", "bottom-right"];
    return positions[Math.floor(Math.random() * positions.length)];
  };

  // Pré-carregamento das imagens
  useEffect(() => {
    const loadImage = (src: string) => {
      return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    };

    Promise.all([loadImage(coverImage), loadImage(salaoImage)])
      .then(() => {
        setIsImageLoaded(true); // Define quando ambas as imagens forem carregadas
      })
      .catch((error) => {
        console.error("Erro ao carregar imagens", error);
      });
  }, [coverImage, salaoImage]);

  // Controla a animação de zoom e troca de imagem
  useEffect(() => {
    if (!isImageLoaded) return; // Espera até que as imagens sejam carregadas

    const startAnimation = () => {
      setStartPosition(getRandomPosition()); // Define uma posição aleatória para o zoom
      setIsZoomed(true); // Inicia o zoom imediatamente

      setTimeout(() => {
        setIsZoomed(false); // Retorna ao estado normal após 3 segundos
      }, 3000); // 3 segundos de zoom

      setTimeout(() => {
        setIsCoverImage((prevState) => !prevState); // Troca a imagem após o zoom
        setIsZoomed(true); // Garante que a próxima imagem inicie com zoom
      }, 6000); // Troca a imagem 3 segundos depois de voltar ao normal
    };

    const intervalId = setInterval(() => {
      startAnimation();
    }, 6000); // A cada 6 segundos

    startAnimation(); // Inicia imediatamente após as imagens serem carregadas

    return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar o componente
  }, [isImageLoaded]);

  const getZoomStyle = () => {
    // Se a imagem está em zoom, retorna o estilo apropriado
    if (isZoomed) {
      switch (startPosition) {
        case "top-left":
          return "origin-top-left scale-150";
        case "top-right":
          return "origin-top-right scale-150";
        case "bottom-left":
          return "origin-bottom-left scale-150";
        case "bottom-right":
          return "origin-bottom-right scale-150";
        default:
          return "";
      }
    }

    // Quando não está em zoom, retorna ao estado normal
    return "scale-100"; // Estado sem zoom
  };

  return (
    <section className="relative w-full h-[63vh]">
  <div className="mb-8 md:mb-16 w-full h-full overflow-hidden relative">
    {isImageLoaded ? (
      <div
        className={`transition-transform duration-[3000ms] ease-in-out transform ${getZoomStyle()} w-full h-full`}
      >
        {isCoverImage ? (
          <Image
            alt={title}
            src={coverImage}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={coverImage} // Imagem de baixa qualidade para o placeholder
            quality={10} // Super low quality inicial
          />
        ) : (
          <Image
            alt={title}
            src={salaoImage}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={salaoImage} // Imagem de baixa qualidade para o placeholder
            quality={10} // Super low quality inicial
          />
        )}
      </div>
    ) : (
      <div className="w-full h-full bg-gray-200 animate-pulse"></div> // Placeholder de loading profissional
    )}
  </div>
</section>

  );
}
