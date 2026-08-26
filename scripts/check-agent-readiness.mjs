import { readdir, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const outputDirectory = resolve("dist");

async function readOutput(relativePath) {
  return readFile(join(outputDirectory, relativePath), "utf8");
}

function assertContains(content, expected, label) {
  if (!content.includes(expected)) {
    throw new Error(`Prontidão para agentes inválida: ${label} ausente.`);
  }
}

function assertLinkTag(content, attributes, label) {
  const tags = content.match(/<link\b[^>]*>/g) ?? [];
  const matchingTag = tags.find((tag) =>
    Object.entries(attributes).every(([name, value]) =>
      tag.includes(`${name}="${value}"`),
    ),
  );

  if (!matchingTag) {
    throw new Error(
      `Prontidão para agentes inválida: link de ${label} ausente.`,
    );
  }
}

const homepage = await readOutput("index.html");
const homepageMarkdown = await readOutput("index.md");
const llmsIndex = await readOutput("llms.txt");
const llmsFull = await readOutput("llms-full.txt");

assertContains(llmsIndex, "# Francy Araújo", "título do llms.txt");
assertContains(
  llmsIndex,
  "> Site oficial de Francy Araújo",
  "resumo do llms.txt",
);
assertContains(
  llmsIndex,
  "https://francyaraujo.com/index.md",
  "versão Markdown principal no llms.txt",
);
assertContains(
  llmsIndex,
  "https://francyaraujo.com/llms-full.txt",
  "conteúdo completo no llms.txt",
);
assertContains(llmsFull, "## Informações principais", "conteúdo consolidado");

assertLinkTag(
  homepage,
  {
    rel: "describedby",
    href: "/llms.txt",
    type: "text/markdown",
  },
  "descoberta do llms.txt",
);
assertLinkTag(
  homepage,
  {
    rel: "alternate",
    type: "text/markdown",
    href: "https://francyaraujo.com/index.md",
  },
  "versão Markdown da página inicial",
);

for (const [signal, label] of [
  ["Rua Israel Bezerra, 46", "endereço"],
  ["+55 88 8190-2582", "telefone"],
  ["Coloração e ruivos", "serviços"],
  ["https://wa.me/558881902582", "WhatsApp"],
  ["https://www.instagram.com/francyaraujocenario/", "Instagram"],
]) {
  assertContains(homepageMarkdown, signal, label);
}

for (const [signal, label] of [
  ['data-agent-fallback="navigation"', "fallback sem JavaScript"],
  ['href="https://wa.me/558881902582', "link real do WhatsApp"],
  [
    'href="https://www.instagram.com/francyaraujocenario/"',
    "link real do Instagram",
  ],
  ['href="/#servicos"', "link real de serviços"],
  ['href="/#historia"', "link real de história"],
]) {
  assertContains(homepage, signal, label);
}

const postsOutputDirectory = join(outputDirectory, "posts");
const entries = await readdir(postsOutputDirectory, { withFileTypes: true });
const postSlugs = entries
  .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
  .map((entry) => entry.name.replace(/\.html$/, ""))
  .sort();

for (const slug of postSlugs) {
  const postHtml = await readOutput(join("posts", `${slug}.html`));
  const postMarkdown = await readOutput(join("posts", `${slug}.md`));

  assertLinkTag(
    postHtml,
    {
      rel: "alternate",
      type: "text/markdown",
      href: `https://francyaraujo.com/posts/${slug}.md`,
    },
    `versão Markdown de /posts/${slug}`,
  );
  assertContains(
    postMarkdown,
    "Rota legada e não indexada",
    `aviso da rota /posts/${slug}`,
  );
}

console.log(
  `Prontidão para agentes aprovada: llms.txt, llms-full.txt, ${postSlugs.length + 1} páginas em Markdown, descoberta explícita, links semânticos e fallback sem JavaScript.`,
);
