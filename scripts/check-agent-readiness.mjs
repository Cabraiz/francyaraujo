import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const outputDirectory = resolve("dist");
const checks = [];

async function readOutput(relativePath) {
  return readFile(join(outputDirectory, relativePath), "utf8");
}

function recordCheck(id, label, passed) {
  checks.push({ id, label, status: passed ? "pass" : "fail" });
}

function checkContains(id, content, expected, label) {
  recordCheck(id, label, content.includes(expected));
}

function checkLinkTag(id, content, attributes, label) {
  const tags = content.match(/<link\b[^>]*>/g) ?? [];
  const matchingTag = tags.find((tag) =>
    Object.entries(attributes).every(([name, value]) =>
      tag.includes(`${name}="${value}"`),
    ),
  );

  recordCheck(id, label, Boolean(matchingTag));
}

const homepage = await readOutput("index.html");
const homepageMarkdown = await readOutput("index.md");
const llmsIndex = await readOutput("llms.txt");
const llmsFull = await readOutput("llms-full.txt");
const robots = await readOutput("robots.txt");
const sitemap = await readOutput("sitemap.xml");

checkContains(
  "llms-title",
  llmsIndex,
  "# Francy Araújo",
  "llms.txt possui título H1",
);
checkContains(
  "llms-summary",
  llmsIndex,
  "> Site oficial de Francy Araújo",
  "llms.txt possui resumo em bloco",
);
checkContains(
  "llms-home-markdown",
  llmsIndex,
  "https://francyaraujo.com/index.md",
  "llms.txt aponta para a página principal em Markdown",
);
checkContains(
  "llms-full",
  llmsIndex,
  "https://francyaraujo.com/llms-full.txt",
  "llms.txt aponta para o conteúdo completo",
);
checkContains(
  "llms-readiness-report",
  llmsIndex,
  "https://francyaraujo.com/agent-readiness.json",
  "llms.txt aponta para o relatório de prontidão",
);
checkContains(
  "llms-full-content",
  llmsFull,
  "## Informações principais",
  "llms-full.txt contém informações consolidadas",
);

checkLinkTag(
  "html-llms-discovery",
  homepage,
  {
    rel: "describedby",
    href: "/llms.txt",
    type: "text/markdown",
  },
  "HTML descobre llms.txt com rel=describedby",
);
checkLinkTag(
  "html-markdown-alternate",
  homepage,
  {
    rel: "alternate",
    type: "text/markdown",
    href: "https://francyaraujo.com/index.md",
  },
  "HTML descobre sua representação Markdown",
);

for (const [id, signal, label] of [
  ["markdown-address", "Rua Israel Bezerra, 46", "Markdown contém endereço"],
  ["markdown-phone", "+55 88 8190-2582", "Markdown contém telefone"],
  ["markdown-services", "Coloração e ruivos", "Markdown contém serviços"],
  [
    "markdown-whatsapp",
    "https://wa.me/558881902582",
    "Markdown contém WhatsApp",
  ],
  [
    "markdown-instagram",
    "https://www.instagram.com/francyaraujocenario/",
    "Markdown contém Instagram",
  ],
]) {
  checkContains(id, homepageMarkdown, signal, label);
}

for (const [id, signal, label] of [
  [
    "initial-loader",
    'data-site-loader="loading"',
    "HTML possui abertura inicial protegida",
  ],
  [
    "initial-loader-noscript",
    ".site-initial-loader { display: none !important; }",
    "Abertura inicial possui escape sem JavaScript",
  ],
  [
    "no-js-fallback",
    'data-agent-fallback="navigation"',
    "HTML possui navegação sem JavaScript",
  ],
  [
    "html-whatsapp-link",
    'href="https://wa.me/558881902582',
    "WhatsApp é um link HTML real",
  ],
  [
    "html-instagram-link",
    'href="https://www.instagram.com/francyaraujocenario/"',
    "Instagram é um link HTML real",
  ],
  ["html-services-link", 'href="/#servicos"', "Serviços têm link HTML real"],
  ["html-history-link", 'href="/#historia"', "História tem link HTML real"],
  [
    "html-structured-data",
    'type="application/ld+json"',
    "HTML contém dados estruturados JSON-LD",
  ],
]) {
  checkContains(id, homepage, signal, label);
}

for (const [id, signal, label] of [
  [
    "robots-oai-search",
    "User-Agent: OAI-SearchBot",
    "Robots libera OAI-SearchBot",
  ],
  ["robots-chatgpt", "User-Agent: ChatGPT-User", "Robots libera ChatGPT-User"],
  [
    "robots-sitemap",
    "Sitemap: https://francyaraujo.com/sitemap.xml",
    "Robots informa o sitemap",
  ],
]) {
  checkContains(id, robots, signal, label);
}
checkContains(
  "sitemap-home",
  sitemap,
  "<loc>https://francyaraujo.com</loc>",
  "Sitemap contém a página principal",
);

const postsOutputDirectory = join(outputDirectory, "posts");
const entries = await readdir(postsOutputDirectory, { withFileTypes: true });
const postSlugs = entries
  .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
  .map((entry) => entry.name.replace(/\.html$/, ""))
  .sort();

recordCheck(
  "markdown-route-count",
  "Todas as seis rotas HTML legadas possuem avaliação Markdown",
  postSlugs.length === 6,
);

for (const slug of postSlugs) {
  const postHtml = await readOutput(join("posts", `${slug}.html`));
  const postMarkdown = await readOutput(join("posts", `${slug}.md`));

  checkLinkTag(
    `post-${slug}-alternate`,
    postHtml,
    {
      rel: "alternate",
      type: "text/markdown",
      href: `https://francyaraujo.com/posts/${slug}.md`,
    },
    `/posts/${slug} descobre sua versão Markdown`,
  );
  checkContains(
    `post-${slug}-legacy-warning`,
    postMarkdown,
    "Rota legada e não indexada",
    `/posts/${slug}.md identifica conteúdo legado`,
  );
  checkContains(
    `post-${slug}-noindex`,
    postHtml,
    '<meta name="robots" content="noindex, nofollow"',
    `/posts/${slug} permanece noindex`,
  );
}

const failedChecks = checks.filter((check) => check.status === "fail");
const infrastructureRequirements = [
  {
    id: "server-request-logs",
    label: "Logs reais de requisição HTTP",
    status: "requires-edge",
    reason: "GitHub Pages não disponibiliza logs de acesso do servidor.",
  },
  {
    id: "accept-content-negotiation",
    label: "Negociação HTTP por Accept: text/markdown",
    status: "requires-edge",
    reason:
      "GitHub Pages não permite selecionar a resposta pelo cabeçalho Accept.",
  },
];
const report = {
  standard: "francy-agent-readiness-v1",
  summary: {
    passed: checks.length - failedChecks.length,
    failed: failedChecks.length,
    requiresEdge: infrastructureRequirements.length,
  },
  checks,
  infrastructureRequirements,
};

await writeFile(
  join(outputDirectory, "agent-readiness.json"),
  `${JSON.stringify(report, null, 2)}\n`,
  "utf8",
);

for (const [index, check] of checks.entries()) {
  const marker = check.status === "pass" ? "✅" : "❌";
  console.log(`${marker} ${index + 1}. ${check.label}`);
}

for (const requirement of infrastructureRequirements) {
  console.log(`⏸ ${requirement.label}: ${requirement.reason}`);
}

if (failedChecks.length > 0) {
  throw new Error(
    `Prontidão para agentes reprovada: ${failedChecks.length} de ${checks.length} verificações falharam.`,
  );
}

console.log(
  `Prontidão para agentes aprovada: ${checks.length} verificações passaram; ${infrastructureRequirements.length} capacidades exigem camada de borda.`,
);
