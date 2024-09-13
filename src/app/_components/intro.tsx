"use client";
import React from 'react';
import { motion } from "framer-motion";
import Link from 'next/link';

export function Intro() {
  return (
    <section className="relative flex flex-col justify-around items-center text-center md:text-left md:flex-row mt-16 mb-16 md:mb-12 p-10 bg-gradient-to-r from-orange-500 to-orange-500 rounded-xl shadow-2xl overflow-hidden">
      
      {/* Nome FrancyAraujo com largura ajustada e centrado */}
      <motion.h1
        className="text-[8vw] md:text-[4vw] font-extrabold tracking-tight leading-tight text-black z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        FrancyAraujo.
      </motion.h1>

      {/* Espaçamento de 10% para criar o efeito de conteúdo ao redor */}
      <div className="flex flex-col md:w-[50%] justify-center items-end md:items-end space-y-4">
        
        {/* Texto de contato */}
        <motion.h4
          className="text-base md:text-lg text-black font-light z-10 text-right"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        >
          Seu cabelo ruivo perfeito está a um toque de distância.
          <span className="hidden xl:inline"> <br /></span>
          <span className="xl:hidden">&nbsp;</span> {/* Adiciona &nbsp; em telas menores */}
          Deixe{" "}
          <Link href="https://wa.me/seu-numero-whatsapp" passHref>
            <motion.div
              className="inline-block bg-white text-black font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
              whileHover={{ scale: 1.1, rotate: [0, 10, -10, 0] }}
            >
              Francy Araujo <span className="ml-2">💬</span>
            </motion.div>
          </Link>{" "}
          revelar a melhor versão de você!
        </motion.h4>
      </div>
    </section>
  );
}
