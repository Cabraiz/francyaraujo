import { PostHeader } from "@/app/_components/post-header";
import { PostBody } from "@/app/_components/post-body";

interface PostContentProps {
  post: {
    title: string;
    coverImage: string;
    date: string;
    author: string; // Considerando que `author` é uma string
  };
  content: string;
}

export default function PostContent({ post, content }: PostContentProps) {
  return (
    <article className="mb-32">
      <PostHeader
        title={post.title}
        coverImage={post.coverImage}
        date={post.date}
        author={post.author} // Aqui é uma string, certifique-se que `PostHeader` aceita string
      />
      <PostBody content={content} />
    </article>
  );
}
