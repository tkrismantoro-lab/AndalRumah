// Dijalankan setelah "vite build": menulis satu file HTML per halaman dengan judul,
// deskripsi, canonical, data terstruktur, dan teks cadangan yang bisa dibaca mesin pencari
// tanpa JavaScript. Juga membuat sitemap.xml dan robots.txt. Sumber datanya src/seo.json.
import { readFileSync, writeFileSync } from "node:fs";

const OUT = process.env.OUT_DIR ?? "dist";

const seo = JSON.parse(readFileSync("src/seo.json", "utf8"));
if (process.env.VITE_SITE_URL) seo.siteUrl = process.env.VITE_SITE_URL.replace(/\/$/, "");
const basePath = new URL(seo.siteUrl + "/").pathname; // "/" atau "/andalrumah/"
const base = readFileSync(`${OUT}/index.html`, "utf8");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const urlOf = (path) => seo.siteUrl + (path === "/" ? "/" : path);
const set = (html, re, value) => {
  if (!re.test(html)) throw new Error("Penanda tidak ditemukan: " + re);
  return html.replace(re, (_, a, b) => a + value + b);
};

const org = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: seo.siteName,
  url: seo.siteUrl + "/",
  logo: seo.siteUrl + "/logo.svg",
  description: seo.pages["/"].description,
};
const faq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: seo.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const ld = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`;

for (const [path, m] of Object.entries(seo.pages)) {
  let html = base;
  html = set(html, /(<title>)[^<]*(<\/title>)/, esc(m.title));
  html = set(html, /(<meta name="description" content=")[^"]*(")/, esc(m.description));
  html = set(html, /(<link rel="canonical" href=")[^"]*(")/, urlOf(path));
  html = set(html, /(<meta property="og:title" content=")[^"]*(")/, esc(m.title));
  html = set(html, /(<meta property="og:description" content=")[^"]*(")/, esc(m.description));
  html = set(html, /(<meta property="og:url" content=")[^"]*(")/, urlOf(path));
  html = set(html, /(<!--JSONLD-->)[\s\S]*?(<!--\/JSONLD-->)/, ld(org) + (path === "/" ? ld(faq) : ""));
  const links = Object.entries(seo.pages).map(([p, x]) => `<li><a href="${basePath}${p.slice(1)}">${esc(x.h1)}</a></li>`).join("");
  const faqHtml = path === "/" ? seo.faq.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join("") : "";
  html = set(html, /(<!--SEO_FALLBACK-->)[\s\S]*?(<!--\/SEO_FALLBACK-->)/,
    `<main><h1>${esc(m.h1)}</h1><p>${esc(m.description)}</p>${faqHtml}<ul>${links}</ul></main>`);
  writeFileSync(path === "/" ? `${OUT}/index.html` : `${OUT}${path}.html`, html);
}

const today = new Date().toISOString().slice(0, 10);
writeFileSync(`${OUT}/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  Object.keys(seo.pages).map((p) => `  <url><loc>${urlOf(p)}</loc><lastmod>${today}</lastmod></url>`).join("\n") +
  `\n</urlset>\n`);
writeFileSync(`${OUT}/404.html`, readFileSync(`${OUT}/index.html`, "utf8"));
writeFileSync(`${OUT}/.nojekyll`, "");
writeFileSync(`${OUT}/robots.txt`, `User-agent: *\nAllow: /\n\nSitemap: ${seo.siteUrl}/sitemap.xml\n`);
console.log("SEO: " + Object.keys(seo.pages).length + " halaman, sitemap.xml, robots.txt");
