"use client";
import React from 'react';
import { motion } from "framer-motion";
import Link from 'next/link';
import Image from 'next/image';

export function Intro() {
  return (
    <section className="relative flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12 p-10 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 rounded-xl shadow-2xl overflow-hidden">
      {/* Fundo animado com partículas */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-400 opacity-20 rounded-lg pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {/* Aqui podemos adicionar um canvas ou partículas SVG */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-50">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#FFDEE9', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#B5FFFC', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <circle cx="50%" cy="50%" r="60%" fill="url(#grad1)" />
        </svg>
      </div>

      {/* Título com efeito de brilho */}
      <motion.h1
        className="relative text-6xl md:text-9xl font-extrabold tracking-tight leading-tight text-white z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{
          background: 'linear-gradient(90deg, #f093fb, #f5576c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        FrancyAraujo.
      </motion.h1>

      {/* Texto de contato com animação */}
      <motion.h4
        className="relative text-center md:text-left text-lg mt-5 md:pl-8 text-white font-light z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
      >
        Entre em contato com{" "}
        <Link
          href="https://wa.me/seu-numero-whatsapp"
          passHref
        >
          <motion.a
            className="inline-block bg-white text-black font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400"
            whileHover={{ scale: 1.1, rotate: [0, 10, -10, 0] }}
          >
            Francy Araujo <span className="ml-2">💬</span>
          </motion.a>
        </Link>{" "}
        especialista em cabelos ruivos, para agendar sua transformação via WhatsApp.
      </motion.h4>
    </section>
  );
}
