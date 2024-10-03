"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Props = {
  title: string;
  coverImage: string;
  salaoImage: string;
  marcaSoloImage: string;
};

export function HeroPost({
  title,
  coverImage,
  salaoImage,
  marcaSoloImage,
}: Readonly<Props>) {
  const [isImageLoaded, setIsImageLoaded] = useState(false); // Controle de carregamento de imagens
  const [currentImage, setCurrentImage] = useState(coverImage); // Estado para controlar a imagem atual
  const [isCoverImage, setIsCoverImage] = useState(true); // Controla qual imagem está ativa

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

    Promise.all([loadImage(coverImage), loadImage(salaoImage), loadImage(marcaSoloImage)])
      .then(() => {
        setIsImageLoaded(true); // Define que todas as imagens foram carregadas
      })
      .catch((error) => {
        console.error("Erro ao carregar imagens", error);
      });
  }, [coverImage, salaoImage, marcaSoloImage]);

  // Controla a troca de imagem
  useEffect(() => {
    if (!isImageLoaded) return;

    const imageSwitchInterval = setInterval(() => {
      setIsCoverImage((prevState) => !prevState); // Alterna entre as imagens
      setCurrentImage(isCoverImage ? salaoImage : coverImage); // Atualiza a imagem
    }, 6000); // Troca a imagem a cada 6 segundos

    return () => clearInterval(imageSwitchInterval); // Limpa o intervalo quando o componente for desmontado
  }, [isImageLoaded, isCoverImage, coverImage, salaoImage]);

  return (
    <section className="relative w-full h-[63vh]">
      <div className="mb-8 md:mb-16 w-full h-full overflow-hidden relative">
        {isImageLoaded ? (
          <div
            className="w-full h-full"
            style={{
              position: "relative",
              overflow: "hidden",
              width: "100%",
              height: "100%",
            }}
          >
            <Image
              alt={title}
              src={currentImage} // Exibe a imagem atual (cover ou salao)
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={currentImage} // Imagem de baixa qualidade para o placeholder
              quality={10} // Qualidade baixa inicial para o placeholder
              style={{
                transform: "scale(1.5)", // Define o scale inicial para 150%
                transition: "transform 0.3s ease-in-out", // Suaviza a transição do scale
              }}
            />
            {/* Adiciona a marcaSoloImage sobreposta */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                alt="Marca Solo"
                src={marcaSoloImage}
                layout="intrinsic" // Usa layout intrínseco para o logo
                width={150} // Defina a largura da imagem da marca
                height={150} // Defina a altura da imagem da marca
                objectFit="contain"
              />
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-gray-200 animate-pulse"></div> // Placeholder de loading profissional
        )}
      </div>
    </section>
  );
}
