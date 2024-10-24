import { getAllPosts, getPostBySlug } from "@/lib/posts";

interface Post {
  title: string;
  coverImage: string;
}

// Função para gerar os caminhos (slugs) das páginas estáticas
export async function generateStaticParams() {
  const posts = await getAllPosts(["slug"]);  // Assegure que isso é uma operação assíncrona

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Componente de página para renderizar apenas a imagem e o nome baseado no slug
export default async function Post({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const resolvedParams = await Promise.resolve(params); // Certifique-se de resolver a promessa se for necessária
  
  // Buscando os dados da imagem com base no slug
  const post = await getPostBySlug(resolvedParams.slug, ["title", "coverImage"]);

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

