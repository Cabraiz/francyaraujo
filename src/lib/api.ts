import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import getConfig from "next/config"; // Importa o getConfig para obter o basePath

// Captura o basePath do publicRuntimeConfig
const { publicRuntimeConfig } = getConfig();
const basePath = publicRuntimeConfig?.basePath || ""; // Garante que o basePath está definido corretamente

console.log("BasePath:", basePath); // Verifica se o basePath está correto

// Define o diretório dos posts
const postsDirectory = join(process.cwd(), "_posts");

// Função para obter todos os slugs dos posts
export async function getPostSlugs(): Promise<string[]> {
  return fs.readdirSync(postsDirectory);
}

// Função para obter os dados de um post específico pelo slug
export async function getPostBySlug(slug: string, fields: string[]): Promise<Post | null> {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);

  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

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
      // Substitui manualmente ${basePath} pelos valores corretos de basePath
      if (typeof data[field] === 'string') {
        items[field] = data[field].replace(/\${basePath}/g, basePath);
      } else {
        items[field] = data[field];
      }
    }
  });

  // Aqui aplicamos o basePath manualmente ao coverImage, se não for feito automaticamente
  if (items.coverImage) {
    items.coverImage = `${basePath}${items.coverImage.startsWith('/') ? items.coverImage : `/${items.coverImage}`}`;
  }

  return items as Post;
}

// Função para obter todos os posts
export async function getAllPosts(): Promise<Post[]> {
  const slugs = await getPostSlugs();
  const fields = ["slug", "content", "date", "coverImage", "title", "ogImage"];

  const posts = await Promise.all(
    slugs.map((slug) => getPostBySlug(slug, fields))
  );

  return posts
    .filter((post): post is Post => post !== null)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}
