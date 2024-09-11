import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

// Obtém os slugs dos posts (nomes dos arquivos)
export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory);
}

// Busca um post específico pelo slug e retorna os campos necessários
export function getPostBySlug(slug: string, fields: string[], config: { basePath: string }): Post | null {
  const realSlug = slug.replace(/\.md$/, ""); // Remove a extensão .md
  const fullPath = join(postsDirectory, `${realSlug}.md`); // Obtém o caminho completo do arquivo .md

  // Verifica se o arquivo existe
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    return null;
  }

  // Lê o conteúdo do arquivo e o processa
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents); // Extrai frontmatter (data) e conteúdo

  // Verifica se o frontmatter foi extraído corretamente
  if (typeof data !== 'object' || typeof content !== 'string') {
    console.error('Invalid file structure:', { data, content });
    return null;
  }

  // Cria o objeto onde vamos armazenar os campos solicitados
  let items: { [key: string]: any } = {};

  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug; // Define o slug
    } else if (field === "content") {
      items[field] = content; // Define o conteúdo
    } else if (data.hasOwnProperty(field)) {
      items[field] = data[field];  // Extrai qualquer outro campo, como coverImage
    } else {
      console.warn(`Field "${field}" not found in post "${realSlug}"`);
    }
  });
  
  // Faz a concatenação do basePath corretamente no coverImage
  try {
    if (items.coverImage && !items.coverImage.includes(config.basePath)) {
      // Concatenamos o basePath apenas se o coverImage não já inclui
      items.coverImage = `${config.basePath}${items.coverImage}`;
    }
  } catch (error) {
    console.error('Error processing coverImage:', error);
    return null;
  }
  
  return items as Post;
}

// Obtém todos os posts e retorna os campos solicitados, ordenados por data
export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const fields = ["slug", "content", "date", "coverImage"];  // Campos solicitados
  const config = { basePath: "/francyaraujo" }; // Define o basePath

  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields, config)) // Mapeia e obtém cada post
    .filter((post): post is Post => post !== null && post !== undefined) // Filtra posts válidos
    .sort((post1, post2) => {
      return post1.date > post2.date ? -1 : 1; // Ordena por data
    });

  return posts;
}
