import { HeroPost } from "@/app/_components/hero-post";
import { SignaturePost } from "@/app/_components/signature-post";
import { Intro } from "@/app/_components/intro";
import { getAllPosts } from "@/lib/posts";

export default async function Index() {
  const allPosts = getAllPosts(["title", "coverImage", "date"]);

  if (!allPosts || allPosts.length === 0) {
    return <p>No posts available.</p>; // Verificação adicional para garantir que os posts estão carregados
  }

  const heroPost = allPosts[0];
  const marcaPost = allPosts[2];
  const salaoPost = allPosts[5];
  const marcaSoloPost = allPosts[3];

  return (
    <main className="flex flex-col justify-start min-h-screen">
      {/* Intro fora do Container para ocupar toda a largura */}
      <Intro title={marcaPost.title} coverImage={marcaPost.coverImage} />
      <HeroPost
        title={heroPost.title}
        coverImage={heroPost.coverImage}
        salaoImage={salaoPost.coverImage}
        marcaSoloImage={marcaSoloPost.coverImage}
      />
      <SignaturePost />
    </main>
  );
}
