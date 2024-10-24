import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
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

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;

  if (!params || typeof params.slug !== 'string') {
    return {
      notFound: true,
    };
  }

  const post = getPostBySlug(params.slug, ["slug", "title", "content", "coverImage", "date", "author"]);

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
