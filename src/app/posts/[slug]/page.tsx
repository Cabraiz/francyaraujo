import { getAllPosts, getPostBySlug } from "@/lib/posts";
import markdownToHtml from "@/lib/markdownToHtml";
import PostContent from "@/app/_components/PostContent";

interface PostPageProps {
  post: Post;
  content: string;
}

interface Author {
  name: string;
  picture: string;  // picture agora é sempre uma string
}

interface Post {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
  content: string;
}

// Função para gerar os caminhos (slugs) das páginas estáticas
export async function generateStaticParams() {
  const posts = getAllPosts(["slug"]);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Componente de página para renderizar o post baseado no slug
export default async function Post({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug, ["slug", "title", "content", "coverImage", "date", "author"]);

  if (!post) {
    return <p>Post not found</p>;
  }

  const content = await markdownToHtml(post.content || "");

  return <PostContent post={{ ...post, content }} />;
}
