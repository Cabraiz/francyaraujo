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

const homepage = readOutput("index.html");
const robots = readOutput("robots.txt");
const sitemap = readOutput("sitemap.xml");
const manifest = JSON.parse(readOutput("favicon/site.webmanifest"));

const homepageSignals = [
  ["<title>Francy Araújo | Cabeleireira", "título local"],
  ['rel="canonical" href="https://francyaraujo.com"', "URL canônica"],
  ['type="application/ld+json"', "dados estruturados JSON-LD"],
  ['"@type":"HairSalon"', "schema HairSalon"],
  ['"telephone":"+55 88 8190-2582"', "telefone comercial"],
  ['"streetAddress":"Rua Israel Bezerra, 46"', "endereço comercial"],
  ["Dionísio Torres", "bairro"],
  ["Fortaleza", "cidade"],
  ["https://www.instagram.com/francyaraujocenario/", "Instagram oficial"],
  ["cabeleireira Francy Araújo", "conteúdo local visível"],
];

for (const [signal, label] of homepageSignals) {
  assertContains(homepage, signal, label);
}

if ((homepage.match(/<h1[ >]/g) ?? []).length !== 1) {
  throw new Error("SEO inválido: a página inicial deve ter exatamente um h1.");
}

assertContains(robots, "User-Agent: *", "regra de rastreamento");
assertContains(robots, "Allow: /", "permissão de rastreamento");
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
  `SEO aprovado: ${homepageSignals.length} sinais locais, robots, sitemap, hierarquia h1 e manifesto validados.`,
);
