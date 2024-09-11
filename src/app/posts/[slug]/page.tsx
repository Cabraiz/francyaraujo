import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import Alert from "@/app/_components/alert";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";

export default async function Post({ params }: { params: { slug: string } }) {
  const fields = ["slug", "content", "date", "title", "coverImage", "ogImage"];

  // Torna o getPostBySlug assíncrono
  const post = await getPostBySlug(params.slug, fields);

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
