import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { PostBody } from "@/app/_components/post-body";
import markdownToHtml from "@/lib/markdownToHtml";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, ["title", "excerpt"]);

  return {
    title: post?.title,
    description: post?.excerpt,
    alternates: {
      types: {
        "text/markdown": `/posts/${slug}.md`,
      },
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug, ["title", "coverImage", "content"]);

  if (!post) {
    notFound();
  }

  const content = await markdownToHtml(post.content);

  return (
    <article>
      <h1>{post.title}</h1>
      <Image
        src={post.coverImage}
        alt={post.title}
        width={1300}
        height={700}
        sizes="100vw"
      />
      <PostBody content={content} />
    </article>
  );
}

export function generateStaticParams() {
  const posts = getAllPosts(["slug"]);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
