import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { CMS_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import Alert from "@/app/_components/alert";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";

export default async function Post({ params }: { params: { slug: string } }) {
  const fields = ["slug", "content", "date"]; // Defina os campos que você precisa
  const config = { basePath: "/your/base/path" }; // Defina o basePath conforme necessário

  const post = getPostBySlug(params.slug, fields, config);

  if (!post || !post.title || !post.ogImage || !post.ogImage.url) {
    return notFound(); // Ou qualquer outra forma de tratamento de erro
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main>
      <Alert preview={post.preview} />
      <Container>
        <Header />
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
          />
          <PostBody content={content} />
        </article>
      </Container>
    </main>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: { params: { slug: string } }): Metadata | undefined {
  const fields = ["title", "description", "ogImage"]; // Certifique-se de incluir todos os campos necessários
  const config = { basePath: "/your/base/path" }; // Defina o basePath conforme necessário

  const post = getPostBySlug(params.slug, fields, config);

  if (!post || !post.title || !post.ogImage || !post.ogImage.url) {
    return notFound(); // Ou qualquer outra forma de tratamento de erro
  }

  const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`;

  return {
    title,
    openGraph: {
      title,
      images: post.ogImage?.url ? [post.ogImage.url] : [], // Verifique se `ogImage.url` existe
    },
  };
}


export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
