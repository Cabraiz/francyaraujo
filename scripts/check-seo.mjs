import { readFileSync } from "node:fs";
import { join } from "node:path";

const outputDirectory = join(process.cwd(), "dist");

function readOutput(path) {
  return readFileSync(join(outputDirectory, path), "utf8");
}

function assertContains(content, expected, label) {
  if (!content.includes(expected)) {
    throw new Error(`SEO inválido: ${label} não encontrado.`);
  }
}

function assertNotContains(content, unexpected, label) {
  if (content.toLowerCase().includes(unexpected.toLowerCase())) {
    throw new Error(`SEO inválido: ${label} encontrado indevidamente.`);
  }
}

function extractRequired(content, pattern, label) {
  const match = content.match(pattern);

  if (!match?.[1]) {
    throw new Error(`SEO inválido: não foi possível extrair ${label}.`);
  }

  return match[1];
}

function assertLength(value, minimum, maximum, label) {
  if (value.length < minimum || value.length > maximum) {
    throw new Error(
      `SEO inválido: ${label} possui ${value.length} caracteres; esperado entre ${minimum} e ${maximum}.`,
    );
  }
}

function assertRobotAllowed(content, userAgent) {
  const block = content
    .split(/\r?\n\r?\n/)
    .find((candidate) => candidate.includes(`User-Agent: ${userAgent}`));

  if (!block?.includes("Allow: /")) {
    throw new Error(
      `SEO inválido: ${userAgent} não possui permissão explícita para rastrear o site.`,
    );
  }
}

const homepage = readOutput("index.html");
const robots = readOutput("robots.txt");
const sitemap = readOutput("sitemap.xml");
const manifest = JSON.parse(readOutput("favicon/site.webmanifest"));
const title = extractRequired(homepage, /<title>([^<]+)<\/title>/, "o título");
const description = extractRequired(
  homepage,
  /<meta name="description" content="([^"]+)"/,
  "a descrição",
);
const jsonLd = JSON.parse(
  extractRequired(
    homepage,
    /<script type="application\/ld\+json">([^<]+)<\/script>/,
    "os dados estruturados",
  ),
);
const graph = jsonLd["@graph"];

if (!Array.isArray(graph)) {
  throw new Error("SEO inválido: o JSON-LD deve publicar um @graph.");
}

const findEntity = (type) => graph.find((entity) => entity["@type"] === type);
const salon = findEntity("HairSalon");
const person = findEntity("Person");
const website = findEntity("WebSite");
const webpage = findEntity("WebPage");

for (const [entity, label] of [
  [salon, "HairSalon"],
  [person, "Person"],
  [website, "WebSite"],
  [webpage, "WebPage"],
]) {
  if (!entity) {
    throw new Error(`SEO inválido: entidade ${label} ausente no JSON-LD.`);
  }
}

assertLength(title, 35, 60, "título");
assertLength(description, 120, 160, "descrição");

const homepageSignals = [
  ["<title>Francy Araújo | Cabeleireira e Ruivos em Fortaleza", "título local"],
  ['rel="canonical" href="https://francyaraujo.com"', "URL canônica"],
  ['type="application/ld+json"', "dados estruturados JSON-LD"],
  ['"@type":"HairSalon"', "schema HairSalon"],
  ['"telephone":"+55 88 8190-2582"', "telefone comercial"],
  ['"streetAddress":"Rua Israel Bezerra, 46"', "endereço comercial"],
  ["Dionísio Torres", "bairro"],
  ["Fortaleza", "cidade"],
  ["https://www.instagram.com/francyaraujocenario/", "Instagram oficial"],
  ["cabeleireira Francy Araújo", "conteúdo local visível"],
  ['href="/#historia"', "âncora interna de história"],
  ['href="/#servicos"', "âncora interna de serviços"],
  ['id="historia"', "destino da história"],
  ['id="servicos"', "destino dos serviços"],
  [
    'property="og:image" content="https://francyaraujo.com/og.jpg"',
    "imagem Open Graph",
  ],
];

for (const [signal, label] of homepageSignals) {
  assertContains(homepage, signal, label);
}

if ((homepage.match(/<h1[ >]/g) ?? []).length !== 1) {
  throw new Error("SEO inválido: a página inicial deve ter exatamente um h1.");
}

assertNotContains(homepage, "noindex", "diretiva noindex");
assertNotContains(homepage, "nofollow", "diretiva nofollow");

const searchableText = [title, description, homepage, JSON.stringify(jsonLd)]
  .join(" ")
  .toLocaleLowerCase("pt-BR");
const queryClusters = [
  ["cabeleireira", "fortaleza"],
  ["especialista", "ruivos", "fortaleza"],
  ["francy araújo", "dionísio torres"],
  ["cortes", "colorações", "tratamentos"],
];

for (const cluster of queryClusters) {
  for (const term of cluster) {
    if (!searchableText.includes(term)) {
      throw new Error(
        `SEO inválido: consulta local [${cluster.join(", ")}] perdeu o termo “${term}”.`,
      );
    }
  }
}

if (
  salon.telephone !== "+55 88 8190-2582" ||
  salon.address?.streetAddress !== "Rua Israel Bezerra, 46" ||
  salon.address?.addressLocality !== "Fortaleza" ||
  salon.employee?.["@id"] !== "https://francyaraujo.com/#francy-araujo"
) {
  throw new Error(
    "SEO inválido: identidade local do HairSalon está incompleta.",
  );
}

if (
  person.jobTitle !== "Cabeleireira e especialista em ruivos" ||
  person.worksFor?.["@id"] !== "https://francyaraujo.com/#salao"
) {
  throw new Error(
    "SEO inválido: entidade profissional da Francy está incompleta.",
  );
}

const offeredServices = salon.hasOfferCatalog?.itemListElement?.map(
  (offer) => offer.itemOffered?.name,
);

for (const service of [
  "Cortes de cabelo",
  "Coloração e ruivos",
  "Tratamentos capilares",
]) {
  if (!offeredServices?.includes(service)) {
    throw new Error(`SEO inválido: serviço estruturado ausente: ${service}.`);
  }
}

assertRobotAllowed(robots, "OAI-SearchBot");
assertRobotAllowed(robots, "ChatGPT-User");
assertRobotAllowed(robots, "*");
assertContains(
  robots,
  "Sitemap: https://francyaraujo.com/sitemap.xml",
  "sitemap no robots.txt",
);
assertContains(
  sitemap,
  "<loc>https://francyaraujo.com</loc>",
  "página principal no sitemap",
);

if (manifest.name !== "Francy Araújo" || manifest.lang !== "pt-BR") {
  throw new Error("SEO inválido: manifesto não identifica a marca em pt-BR.");
}

for (const icon of manifest.icons) {
  if (!icon.src.startsWith("/favicon/")) {
    throw new Error(`SEO inválido: caminho de ícone incorreto: ${icon.src}`);
  }
}

console.log(
  `SEO aprovado: ${homepageSignals.length} sinais locais, ${queryClusters.length} consultas-alvo, OAI-SearchBot, ChatGPT-User, schema de negócio/profissional, sitemap, h1 e manifesto validados.`,
);
