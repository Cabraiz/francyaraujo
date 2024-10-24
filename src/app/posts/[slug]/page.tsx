import { getAllPosts, getPostBySlug } from "@/lib/posts";
import markdownToHtml from "@/lib/markdownToHtml";
import PostContent from "@/app/_components/PostContent";

interface PostPageProps {
  params: {
    slug: string;
  };
}

interface Post {
  title: string;
  coverImage: string;
  date: string;
  author: string;
  content: string; // Inclua 'content' no tipo Post
}

// Função para gerar os parâmetros estáticos (slugs)
export async function generateStaticParams() {
  const posts = getAllPosts(["slug"]);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Componente de página para renderizar o post baseado no slug
export default async function Post({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug, ["slug", "title", "content", "coverImage", "date", "author"]);

  if (!post) {
    return <p>Post not found</p>;
  }

  const content = await markdownToHtml(post.content || "");

  // Inclui `content` diretamente no objeto `post` e passa o objeto `post` completo
  return <PostContent post={{ ...post, content }} />;
}
