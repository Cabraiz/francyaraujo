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
  const [isAnimating, setIsAnimating] = useState(false); // Controle da animação

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

  useEffect(() => {
    if (!isImageLoaded) return; // Espera até que as imagens sejam carregadas

    const startAnimation = () => {
      setIsAnimating(true); // Inicia a animação
      setStartPosition(getRandomPosition()); // Aplica uma posição aleatória para o zoom

      setTimeout(() => {
        setIsAnimating(false); // Finaliza a animação após 3 segundos
        setIsCoverImage((prevState) => !prevState); // Troca a imagem após a animação
      }, 3000); // 3 segundos para a animação terminar
    };

    const intervalId = setInterval(() => {
      startAnimation();
    }, 6000); // Ciclo total de 6 segundos: 3 segundos para animação, 3 segundos imagem parada

    return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar o componente
  }, [isImageLoaded]);

  const getZoomStyle = () => {
    // Se a animação estiver em execução, retorna o estilo de zoom apropriado
    if (isAnimating) {
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

    // Quando a animação termina, retorna ao estado normal (sem zoom)
    return "scale-100"; // Sem zoom após a animação
  };

  return (
    <section className="relative w-full h-[500px]"> {/* Define a altura do contêiner */}
      <div className="mb-8 md:mb-16 w-full h-full overflow-hidden relative">
        {isImageLoaded ? ( // Só renderiza as imagens quando carregadas
          <div
            className={`transition-transform duration-[3000ms] ease-in-out transform ${getZoomStyle()} w-full h-full`}
          >
            {isCoverImage ? (
              <Image
                alt={title}
                src={coverImage}
                layout="fill" // Garante que a imagem ocupe todo o contêiner
                objectFit="cover" // Garante que a imagem se ajuste corretamente dentro do contêiner
                placeholder="blur"
                blurDataURL={coverImage} // Aqui você pode passar uma versão base64 de baixa qualidade
              />
            ) : (
              <Image
                alt={title}
                src={salaoImage}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                blurDataURL={salaoImage} // Também deve ser uma versão base64 de baixa qualidade
              />
            )}
          </div>
        ) : (
          <div>Carregando imagens...</div> // Placeholder enquanto carrega
        )}
      </div>
    </section>
  );
}
