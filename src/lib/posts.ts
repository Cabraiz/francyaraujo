import fs from "node:fs";
import { join } from "node:path";

import matter from "gray-matter";

import type { Post } from "@/interfaces/post";

type PostField = keyof Post;
type PostSource = Record<string, unknown> & {
  content: string;
  slug: string;
};

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"));
}

function readPost(slug: string): PostSource | null {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    ...data,
    content,
    slug: realSlug,
  };
}

function selectFields<K extends PostField>(
  post: PostSource,
  fields: readonly K[],
): Pick<Post, K> {
  return Object.fromEntries(
    fields.map((field) => [field, post[field]]),
  ) as Pick<Post, K>;
}

export function getPostBySlug<K extends PostField>(
  slug: string,
  fields: readonly K[],
): Pick<Post, K> | null {
  const post = readPost(slug);
  return post ? selectFields(post, fields) : null;
}

export function getAllPosts<K extends PostField>(
  fields: readonly K[],
): Array<Pick<Post, K>> {
  return getPostSlugs()
    .map(readPost)
    .filter((post): post is PostSource => post !== null)
    .sort((left, right) =>
      String(right.date ?? "").localeCompare(String(left.date ?? "")),
    )
    .map((post) => selectFields(post, fields));
}
