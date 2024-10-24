import { getPostBySlug, getAllPosts } from '@/lib/posts';

interface Params {
  params: {
    slug: string;
  };
}

export const getStaticProps = async ({ params }: Params) => {
  const post = getPostBySlug(params?.slug, ['title', 'content', 'date', 'coverImage', 'slug']);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};


export const getStaticPaths = async () => {
  const posts = getAllPosts(['slug']);
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};
export { getAllPosts };

