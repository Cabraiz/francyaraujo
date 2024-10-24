import { getAllPosts, getPostBySlug } from "@/lib/posts"; 
import { notFound } from "next/navigation";
import markdownToHtml from "@/lib/markdownToHtml";
import { PostHeader } from "@/app/_components/post-header";
import { PostBody } from "@/app/_components/post-body";

interface PostPageProps {
  readonly params: {
    readonly slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts(["slug"]); // Passando os campos corretos

  return posts.map((post) => ({
    slug: post.slug, // Retorna os slugs para gerar as páginas estáticas
  }));
}

export default async function Post({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug, ["slug", "title", "content", "coverImage", "date", "author"]);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <article className="mb-32">
      <PostHeader
        title={post.title}
        coverImage={post.coverImage}
        date={post.date}
        author={post.author}
      />
      <PostBody content={content} />
    </article>
  );
}
