import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import seoData from "../seo.json";

// SITE_URL saat build (misalnya alamat GitHub Pages) menggantikan siteUrl di seo.json.
const seo = { ...seoData, siteUrl: (import.meta.env.VITE_SITE_URL as string | undefined) ?? seoData.siteUrl };

type Meta = { title: string; description: string };
const pages = seo.pages as Record<string, Meta>;

function setAttr(selector: string, attr: string, value: string) {
  document.head.querySelector(selector)?.setAttribute(attr, value);
}

/** Menyesuaikan judul, deskripsi, dan canonical saat berpindah halaman. */
export function PageMeta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const m = pages[pathname] ?? pages["/"];
    const url = seo.siteUrl + (pathname === "/" || !pages[pathname] ? "/" : pathname);
    document.title = m.title;
    setAttr('meta[name="description"]', "content", m.description);
    setAttr('link[rel="canonical"]', "href", url);
    setAttr('meta[property="og:title"]', "content", m.title);
    setAttr('meta[property="og:description"]', "content", m.description);
    setAttr('meta[property="og:url"]', "content", url);
  }, [pathname]);
  return null;
}
