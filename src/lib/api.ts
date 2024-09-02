import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[], config: { basePath: string }) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  if (!data || !content) {
    return null;
  }

  let items: { [key: string]: any } = {};

  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }
    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  let itemsStr = JSON.stringify(items);
  itemsStr = itemsStr.replaceAll(/\$\{basePath\}/g, config.basePath);
  items = JSON.parse(itemsStr);

  return items as Post;
}


export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const fields = ["slug", "content", "date"];
  const config = { basePath: "/your/base/path" };

  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields, config))
    .filter((post): post is Post => post !== null && post !== undefined) // Filtra valores null ou undefined
    .sort((post1, post2) => {
      if (!post1 || !post2) return 0; // Garante que post1 e post2 existem antes de comparar
      return post1.date > post2.date ? -1 : 1;
    });

  return posts;
}


