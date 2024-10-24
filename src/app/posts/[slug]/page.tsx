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
  content: string;
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
  const post = await getPostBySlug(params.slug, ["slug", "title", "content", "coverImage", "date", "author"]);

  if (!post) {
    return <p>Post not found</p>;
  }

  const content = await markdownToHtml(post.content || "");

  return <PostContent post={{ ...post, content }} />;
}
