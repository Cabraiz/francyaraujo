"use client";  // Isso indica que este arquivo é um componente cliente

import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { useParams } from "next/navigation"; // Importando useParams

interface Post {
  title: string;
  coverImage: string;
}

// Função para gerar os caminhos (slugs) das páginas estáticas
export async function generateStaticParams() {
  const posts = getAllPosts(["slug"]);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Componente de página para renderizar apenas a imagem e o nome baseado no slug
export default function Post() {
  const params = useParams(); // Obtendo params via useParams

  // Verifica se o slug é um array de strings e pega a primeira string
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  if (!slug) {
    return <p>Post not found</p>;
  }

  // Buscando os dados da imagem com base no slug
  const post = getPostBySlug(slug, ["title", "coverImage"]);

  if (!post) {
    return <p>Post not found</p>;
  }

  // Renderiza a imagem e o título (nome da imagem)
  return (
    <article>
      <h1>{post.title}</h1>
      <img src={post.coverImage} alt={post.title} />
    </article>
  );
}
