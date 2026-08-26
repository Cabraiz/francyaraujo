import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { basename, join, resolve } from "node:path";
import matter from "gray-matter";

const siteUrl = "https://francyaraujo.com";
const instagramUrl = "https://www.instagram.com/francyaraujocenario/";
const whatsappUrl =
  "https://wa.me/558881902582?text=Ol%C3%A1%2C%20Francy!%20Gostaria%20de%20agendar%20um%20hor%C3%A1rio.";
const outputDirectory = resolve("dist");
const postsDirectory = resolve("_posts");

const homepageMarkdown = `# Francy Araújo

> Cabeleireira e especialista em ruivos, cortes, colorações e tratamentos em Dionísio Torres, Fortaleza.

## Informações principais

- **Profissional:** Francy Araújo
- **Especialidade:** cabelos ruivos, cortes, colorações e tratamentos capilares
- **Endereço:** Rua Israel Bezerra, 46, Dionísio Torres, Fortaleza, CE, Brasil
- **Telefone:** +55 88 8190-2582
- **Agendamento:** [WhatsApp](${whatsappUrl})
- **Portfólio:** [Instagram](${instagramUrl})
- **Site oficial:** [francyaraujo.com](${siteUrl})

## Serviços

- Cortes de cabelo
- Coloração e ruivos
- Tratamentos capilares
- Manicure
- Depilação

Preços, horários disponíveis e duração dos serviços devem ser confirmados diretamente pelo WhatsApp.

## Navegação

- [Serviços](${siteUrl}/#servicos)
- [História profissional](${siteUrl}/#historia)
- [Página inicial em HTML](${siteUrl}/)
- [Índice para agentes de IA](${siteUrl}/llms.txt)
- [Conteúdo completo para agentes](${siteUrl}/llms-full.txt)
- [Sitemap XML](${siteUrl}/sitemap.xml)
- [Regras de rastreamento](${siteUrl}/robots.txt)
`;

const llmsIndex = `# Francy Araújo

> Site oficial de Francy Araújo, cabeleireira e especialista em ruivos em Fortaleza, CE.

## Conteúdo principal

- [Página inicial em Markdown](${siteUrl}/index.md): informações profissionais, serviços, endereço e canais de contato.
- [Conteúdo completo](${siteUrl}/llms-full.txt): versão textual consolidada do conteúdo público e atual do site.
- [Página inicial em HTML](${siteUrl}/): experiência visual oficial do salão.

## Contato e portfólio

- [Agendar pelo WhatsApp](${whatsappUrl})
- [Portfólio no Instagram](${instagramUrl})

## Recursos técnicos

- [Sitemap](${siteUrl}/sitemap.xml)
- [Robots](${siteUrl}/robots.txt)
`;

const llmsFull = `${homepageMarkdown.trim()}

## Nota sobre rotas legadas

As rotas em \`/posts/\` pertencem ao modelo inicial do projeto, estão marcadas como \`noindex\` e não representam informações comerciais atuais. Cada uma possui uma versão Markdown correspondente apenas para manter paridade de formato entre as páginas publicadas.
`;

async function writeText(relativePath, content) {
  const target = join(outputDirectory, relativePath);
  await mkdir(join(target, ".."), { recursive: true });
  await writeFile(target, `${content.trim()}\n`, "utf8");
}

await writeText("index.md", homepageMarkdown);
await writeText("llms.txt", llmsIndex);
await writeText("llms-full.txt", llmsFull);

const postFiles = (await readdir(postsDirectory))
  .filter((fileName) => fileName.endsWith(".md"))
  .sort();

for (const fileName of postFiles) {
  const slug = basename(fileName, ".md");
  const source = await readFile(join(postsDirectory, fileName), "utf8");
  const { data, content } = matter(source);
  const title = String(data.title ?? slug);
  const excerpt = String(data.excerpt ?? "").trim();
  const body = content.trim();
  const markdown = `# ${title}

> Rota legada e não indexada. Este conteúdo não representa informações comerciais atuais de Francy Araújo.

- [Página HTML correspondente](${siteUrl}/posts/${slug})
- [Página inicial atual](${siteUrl}/index.md)

${excerpt ? `## Resumo\n\n${excerpt}\n` : ""}
## Conteúdo

${body || "Esta rota não possui conteúdo textual adicional."}
`;

  await writeText(join("posts", `${slug}.md`), markdown);
}

console.log(
  `Conteúdo para agentes gerado: llms.txt, llms-full.txt, página inicial e ${postFiles.length} rotas legadas em Markdown.`,
);
