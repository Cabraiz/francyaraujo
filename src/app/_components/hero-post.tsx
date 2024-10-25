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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [objectPosition, setObjectPosition] = useState("top"); // Posição inicial da imagem
  const images = [coverImage, salaoImage, salonImage];

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

  // Controla a troca de imagem e persistência da posição/zoom
  useEffect(() => {
    if (!isImageLoaded) return;

    const updateImagePosition = (index: number) => {
      const position = index === 1 ? "center" : "top";
      setObjectPosition(position);
    };

    const imageSwitchInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        updateImagePosition(nextIndex);
        return nextIndex;
      });
    }, 6000);

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
              transition: "transform 0.2s ease-in-out",
              transform: "scale(1.1)", // Aplica um leve zoom fixo
            }}
          >
            <Image
              alt={title}
              src={images[currentImageIndex]}
              layout="fill"
              objectFit="cover"
              objectPosition={objectPosition} // Define a posição dinâmica fixa
              placeholder="blur"
              blurDataURL={images[currentImageIndex]}
              quality={100} // Qualidade fixa
              priority // Configura a imagem para carregamento prioritário
            />
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
