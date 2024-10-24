// lib/posts.ts

import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

// Define o diretório dos posts
const postsDirectory = join(process.cwd(), "_posts");

// Função para obter todos os slugs dos posts
export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory);
}

// Função para obter os dados de um post específico pelo slug
export function getPostBySlug(slug: string, fields: string[]): Post | null {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);

  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents); // Parseia o conteúdo Markdown

  let items: { [key: string]: any } = {};

  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content; // Adiciona o content
    } else if (data.hasOwnProperty(field)) {
      items[field] = data[field];
    }
  });

  return items as Post;
}


// Função para obter todos os posts
export function getAllPosts(fields: string[]): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => getPostBySlug(slug, fields));

  return posts
    .filter((post): post is Post => post !== null)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}