import { Author } from "@/interfaces/author";  // Importe a interface correta
import { PostHeader } from "@/app/_components/post-header";
import { PostBody } from "@/app/_components/post-body";

// Defina o tipo PostContentProps, garantindo que `content` esteja dentro de `post`
interface PostContentProps {
  post: {
    title: string;
    coverImage: string;
    date: string;
    author: Author;  // Agora usa a interface importada
    content: string;
  };
}

// Componente PostContent que recebe o post
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
