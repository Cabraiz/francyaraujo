import { GetStaticProps, GetStaticPaths } from 'next';
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import markdownToHtml from "@/lib/markdownToHtml";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts(["slug"]);

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = getPostBySlug(params?.slug as string, ["slug", "title", "content", "coverImage", "date", "author"]);

  if (!post) {
    return {
      notFound: true,
    };
  }

  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post,
      content,
    },
  };
};
