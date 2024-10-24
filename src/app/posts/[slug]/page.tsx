import { GetStaticProps, GetStaticPaths } from "next";
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
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts(["slug"]);

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,  // Define como 'false' para retornar 404 se o slug não for encontrado
  };
};

// Função para passar as props estáticas para o componente
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = getPostBySlug(params?.slug as string, ["slug", "title", "content", "coverImage", "date", "author"]);

  if (!post) {
    return {
      notFound: true,
    };
  }

  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        author: {
          name: post.author.name,
          picture: post.author.picture ?? "",  // Se picture for undefined, usa string vazia
        },
      },
      content,
    },
  };
};

// Componente de página para renderizar o post baseado no slug
export default function Post({ post, content }: PostPageProps) {
  return <PostContent post={{ ...post, content }} />;
}
