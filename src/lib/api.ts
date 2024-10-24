import { GetStaticPropsContext } from 'next';
import { getPostBySlug } from "@/lib/posts";
import markdownToHtml from "@/lib/markdownToHtml";

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;

  if (!params?.slug) {
    return {
      notFound: true,
    };
  }

  // Se params.slug for um array, usa o primeiro item.
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const post = getPostBySlug(slug, ["slug", "title", "content", "coverImage", "date", "author"]);

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
}
