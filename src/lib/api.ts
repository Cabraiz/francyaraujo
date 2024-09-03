import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[], config: { basePath: string }): Post | null {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);

  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Verifique se o frontmatter e o conteúdo foram extraídos corretamente
  if (typeof data !== 'object' || typeof content !== 'string') {
    console.error('Invalid file structure:', { data, content });
    return null;
  }

  let items: { [key: string]: any } = {};

  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    } else if (field === "content") {
      items[field] = content;
    } else if (data.hasOwnProperty(field)) {
      items[field] = data[field];
    } else {
      console.warn(`Field "${field}" not found in post "${realSlug}"`);
    }
  });

  // Converte o objeto para string e faz substituições baseadas no basePath
  try {
    let itemsStr = JSON.stringify(items);
    itemsStr = itemsStr.replace(/\$\{basePath\}/g, config.basePath);
    items = JSON.parse(itemsStr);
  } catch (error) {
    console.error('Error during JSON manipulation:', error);
    return null;
  }

  return items as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const fields = ["slug", "content", "date"];
  const config = { basePath: "/francyaraujo" };

  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields, config))
    .filter((post): post is Post => post !== null && post !== undefined) // Filtra valores null ou undefined
    .sort((post1, post2) => {
      if (!post1 || !post2) return 0; // Garante que post1 e post2 existem antes de comparar
      return post1.date > post2.date ? -1 : 1;
    });

  return posts;
}
