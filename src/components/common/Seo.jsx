import { useEffect } from "react";
import { absoluteUrl, formatSeoTitle, SITE_SEO } from "../../config/seo";

function upsertMeta(attributeName, attributeValue, content) {
  const selector = `meta[${attributeName}="${attributeValue}"]`;
  let element = document.head.querySelector(selector);

  if (!content) {
    element?.remove();
    return;
  }

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }

  element.setAttribute("content", String(content));
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);

  if (!href) {
    element?.remove();
    return;
  }

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

function removeManagedJsonLd() {
  document.head
    .querySelectorAll('script[type="application/ld+json"][data-seo-json-ld="true"]')
    .forEach((element) => element.remove());
}

function addJsonLd(schema, index) {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.dataset.seoJsonLd = "true";
  script.dataset.seoIndex = String(index);
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

function Seo({
  title,
  description = SITE_SEO.defaultDescription,
  canonicalPath,
  image = SITE_SEO.defaultImage,
  type = "website",
  robots = "index, follow",
  keywords,
  jsonLd = [],
  publishedTime,
  modifiedTime,
  author,
}) {
  const schemas = Array.isArray(jsonLd) ? jsonLd.filter(Boolean) : [jsonLd].filter(Boolean);
  const serializedSchemas = JSON.stringify(schemas);

  useEffect(() => {
    const finalTitle = formatSeoTitle(title);
    const finalDescription = description || SITE_SEO.defaultDescription;
    const canonicalUrl = absoluteUrl(canonicalPath || window.location.pathname || "/");
    const imageUrl = absoluteUrl(image || SITE_SEO.defaultImage);

    document.documentElement.lang = "vi";
    document.title = finalTitle;

    upsertMeta("name", "description", finalDescription);
    upsertMeta("name", "robots", robots);
    upsertMeta("name", "googlebot", robots);
    upsertMeta("name", "keywords", keywords);

    upsertMeta("property", "og:locale", SITE_SEO.locale);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:site_name", SITE_SEO.siteName);
    upsertMeta("property", "og:title", finalTitle);
    upsertMeta("property", "og:description", finalDescription);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", imageUrl);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", finalTitle);
    upsertMeta("name", "twitter:description", finalDescription);
    upsertMeta("name", "twitter:image", imageUrl);

    upsertMeta("property", "article:published_time", publishedTime);
    upsertMeta("property", "article:modified_time", modifiedTime);
    upsertMeta("property", "article:author", author);

    upsertLink("canonical", canonicalUrl);

    removeManagedJsonLd();
    JSON.parse(serializedSchemas).forEach(addJsonLd);
  }, [
    title,
    description,
    canonicalPath,
    image,
    type,
    robots,
    keywords,
    serializedSchemas,
    publishedTime,
    modifiedTime,
    author,
  ]);

  return null;
}

export default Seo;
