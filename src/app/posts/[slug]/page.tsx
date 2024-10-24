import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import markdownToHtml from "@/lib/markdownToHtml";
import { PostHeader } from "@/app/_components/post-header";
import { PostBody } from "@/app/_components/post-body";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts(["slug"]);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Post(props: PostPageProps) {
  const { params } = props; // Desestruturando params dentro da função
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
