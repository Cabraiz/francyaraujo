"use client";
import React from 'react';
import { motion } from "framer-motion";
import Link from 'next/link';

export function Intro() {
  return (
    <section className="relative flex items-center justify-between mt-16 mb-16 md:mb-12 p-10 bg-gradient-to-r from-orange-500 to-orange-500 rounded-xl shadow-2xl overflow-hidden">
      {/* Nome FrancyAraujo com largura e fonte ajustadas */}
      <motion.h1
        className="text-[8vw] md:text-[4vw] font-extrabold tracking-tight leading-tight text-black z-10 w-[40%]"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        FrancyAraujo.
      </motion.h1>

      {/* Espaço vazio de 10% */}
      <div className="w-[10%]"></div>

      {/* Texto de contato com 50% de largura */}
      <motion.h4
        className="text-center md:text-left text-base md:text-lg text-black font-light z-10 w-[50%]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
      >
        Entre em contato com{" "}
        <Link href="https://wa.me/seu-numero-whatsapp" passHref>
          <motion.a
            className="inline-block bg-white text-black font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
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
