import { getPostBySlug, getAllPosts } from "@/lib/posts";

// Tipagem para os props, garantindo que params seja uma Promise ou undefined
interface PageProps {
  params?: Promise<{ slug: string }>;
}

// Página de Post com params como uma promessa
export default async function PostPage({ params }: PageProps) {
  // Resolvendo params se ele for uma Promise
  const resolvedParams = params ? await params : undefined;

  if (!resolvedParams) {
    return <p>Invalid parameters</p>;
  }

  // Buscando os dados do post com base no slug
  const post = await getPostBySlug(resolvedParams.slug, ["title", "coverImage"]);

  // Tratamento de erro caso o post não seja encontrado
  if (!post) {
    return <p>Post not found</p>;
  }

  // Renderiza a imagem e o título do post
  return (
    <article>
      <h1>{post.title}</h1>
      <img src={post.coverImage} alt={post.title} />
    </article>
  );
}

// Função para gerar os slugs estaticamente
export async function generateStaticParams() {
  const posts = await getAllPosts(["slug"]);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
