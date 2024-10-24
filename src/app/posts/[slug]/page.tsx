import { getAllPosts } from "@/lib/posts";
import PostContent from "@/app/_components/PostContent";

interface PostPageProps {
  post: {
    title: string;
    coverImage: string;
    date: string;
    author: string;
    content: string;
  };
}



export async function generateStaticParams() {
  const posts = getAllPosts(["slug"]);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function Post({ post }: PostPageProps) {
  return <PostContent post={post} content={post.content} />;
}
