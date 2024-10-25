"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Props = {
  title: string;
  coverImage: string;
  salaoImage: string;
  salonImage: string;
  marcaSoloImage: string;
};

export function HeroPost({
  title,
  coverImage,
  salaoImage,
  salonImage,
  marcaSoloImage,
}: Readonly<Props>) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Controla o índice da imagem atual

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

    Promise.all([loadImage(coverImage), loadImage(salaoImage), loadImage(salonImage), loadImage(marcaSoloImage)])
      .then(() => {
        setIsImageLoaded(true);
      })
      .catch((error) => {
        console.error("Erro ao carregar imagens", error);
      });
  }, [coverImage, salaoImage, salonImage, marcaSoloImage]);

  // Imagens a serem alternadas
  const images = [coverImage, salaoImage, salonImage];

  // Controla a troca de imagem
  useEffect(() => {
    if (!isImageLoaded) return;

    const imageSwitchInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // Altera a imagem a cada 6 segundos

    return () => clearInterval(imageSwitchInterval);
  }, [isImageLoaded, images.length]);

  return (
    <section className="relative w-full h-[66vh]">
      <div className="mb-8 md:mb-16 w-full h-full overflow-hidden relative">
        {isImageLoaded ? (
          <div
            className="w-full h-full"
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            <Image
              alt={title}
              src={images[currentImageIndex]} 
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={images[currentImageIndex]} 
              quality={10} 
            />
            {/* Adiciona a marcaSoloImage sobreposta */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                alt="Marca Solo"
                src={marcaSoloImage}
                layout="intrinsic"
                width={150}
                height={150}
                objectFit="contain"
              />
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-gray-200 animate-pulse"></div>
        )}
      </div>
    </section>
  );
}
