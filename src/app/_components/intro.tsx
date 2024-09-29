"use client";
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa'; // Para o ícone do WhatsApp

export function Intro() {
  const [sectionHeight, setSectionHeight] = useState('5vw'); // Altura padrão para web

  // Atualiza a altura da seção com base na largura da tela
  useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth > 768) {
        setSectionHeight('5vw'); // Altura para web
      } else {
        setSectionHeight('22vw'); // Altura para mobile
      }
    };

    // Atualiza a altura ao carregar e ao redimensionar a janela
    updateHeight();
    window.addEventListener('resize', updateHeight);

    // Remove o listener quando o componente for desmontado
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <section
      className="relative flex flex-col md:flex-row justify-around items-center text-center md:text-left mb-8 md:mb-12 p-6 md:p-10 bg-glass shadow-2xl overflow-hidden border-b-2 border-black"
      style={{ height: sectionHeight, borderRadius: '0' }} // Adiciona ou ajusta o borderRadius para 0
    >
      {/* Nome FrancyAraujo ajustado para diferentes telas */}
      <motion.h1
        className="text-[8vw] md:text-[4vw] font-extrabold tracking-tight leading-tight text-black z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        FrancyAraujo.
      </motion.h1>

      {/* Div com textos e botão ajustados para mobile e desktop */}
      <div className="flex flex-col md:w-[50%] justify-center items-center md:items-end space-y-2 md:space-y-4 text-right">
        {/* Texto otimizado, escondido no mobile */}
        <motion.h4
          className="text-sm md:text-lg text-black font-light leading-snug z-10 hidden sm:block" // Esconde o texto no mobile
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          Seu cabelo ruivo perfeito está a um toque de distância. Deixe a transformação começar agora mesmo!
        </motion.h4>

        {/* Botão de ação com estilo WhatsApp visível no mobile */}
        <Link href="https://wa.me/seu-numero-whatsapp" passHref>
          <motion.button
            className="mt-4 md:mt-0 bg-green-500 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaWhatsapp className="text-xl" />
            <span>Converse Agora</span>
          </motion.button>
        </Link>
      </div>
    </section>
  );
}
