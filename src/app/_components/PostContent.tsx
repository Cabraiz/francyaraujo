import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import type { Author } from "@/interfaces/author";

interface PostContentProps {
  post: {
    title: string;
    coverImage: string;
    date: string;
    author: Author;
    content: string;
  };
}

export default function PostContent({ post }: PostContentProps) {
  return (
    <article className="mb-32">
      <PostHeader
        title={post.title}
        coverImage={post.coverImage}
        date={post.date}
        author={post.author}
      />
      <PostBody content={post.content} />
    </article>
  );
}
