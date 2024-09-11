import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

// Define o diretório onde os arquivos de posts estão armazenados
const postsDirectory = join(process.cwd(), "_posts");

// Função para obter os slugs dos arquivos de posts (os nomes dos arquivos sem a extensão)
export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory);
}

// Função para buscar um post específico com base no slug (nome do arquivo)
export function getPostBySlug(slug: string, fields: string[]): Post | null {
  const realSlug = slug.replace(/\.md$/, ""); // Remove a extensão .md do slug
  const fullPath = join(postsDirectory, `${realSlug}.md`); // Cria o caminho completo do arquivo .md

  // Verifica se o arquivo existe
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    return null;
  }

  // Lê o conteúdo do arquivo .md
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents); // Usa gray-matter para separar o frontmatter e o conteúdo

  // Verifica se os dados foram extraídos corretamente
  if (typeof data !== 'object' || typeof content !== 'string') {
    console.error('Invalid file structure:', { data, content });
    return null;
  }

  // Armazena os campos extraídos do frontmatter e do conteúdo
  let items: { [key: string]: any } = {};

  // Itera sobre os campos solicitados (fields) e extrai os valores corretos
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug; // Define o slug
    } else if (field === "content") {
      items[field] = content; // Define o conteúdo
    } else if (data.hasOwnProperty(field)) {
      items[field] = data[field];  // Extrai os outros campos, como coverImage, title, etc.
    } else {
      console.warn(`Field "${field}" not found in post "${realSlug}"`);
    }
  });

  return items as Post; // Retorna o post com os campos solicitados
}

// Função para obter todos os posts com os campos solicitados e ordená-los por data
export function getAllPosts(): Post[] {
  const slugs = getPostSlugs(); // Obtém todos os slugs
  const fields = ["slug", "content", "date", "coverImage"];  // Define os campos que serão extraídos

  // Mapeia os slugs para obter os posts correspondentes
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields)) // Extrai os posts pelos slugs
    .filter((post): post is Post => post !== null && post !== undefined) // Filtra os posts válidos
    .sort((post1, post2) => {
      return post1.date > post2.date ? -1 : 1; // Ordena os posts pela data
    });

  return posts; // Retorna os posts ordenados
}
