import { PostHeader } from "@/app/_components/post-header";
import { PostBody } from "@/app/_components/post-body";

// Defina o tipo Author corretamente
interface Author {
  name: string;
  picture?: string;
}

// Defina o tipo PostContentProps, garantindo que `content` esteja dentro de `post`
interface PostContentProps {
  post: {
    title: string;
    coverImage: string;
    date: string;
    author: Author; 
    content: string; // `content` agora faz parte de `post`
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
        author={post.author.name}  // Usa `post.author.name` aqui para passar o nome
      />
      <PostBody content={post.content} />  {/* Agora `post.content` */}
    </article>
  );
}
