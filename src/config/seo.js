const rawSiteUrl =
  import.meta.env.VITE_SITE_URL ||
  import.meta.env.VITE_PUBLIC_SITE_URL ||
  "https://www.gocxanh.app";

function normalizeSiteUrl(value) {
  return String(value || "https://www.gocxanh.app").replace(/\/+$/, "");
}

export const SITE_SEO = {
  siteName: "Góc Xanh Shop",
  siteUrl: normalizeSiteUrl(rawSiteUrl),
  defaultTitle:
    "Góc Xanh Shop - Sản phẩm nhóm 2 môn Phát triển giao diện ứng dụng",
  defaultDescription:
    "Góc Xanh Shop là website giới thiệu và bán cây cảnh mô phỏng, sản phẩm của nhóm 2 môn Phát triển giao diện ứng dụng. Địa chỉ: 12 Nguyễn Văn Bảo, Hạnh Thông, Hồ Chí Minh.",
  defaultImage: "/favicon.png",
  locale: "vi_VN",
  phone: "",
  address: {
    streetAddress: "12 Nguyễn Văn Bảo",
    addressLocality: "Hạnh Thông",
    addressRegion: "Hồ Chí Minh",
    addressCountry: "VN",
  },
};

export function absoluteUrl(path = "/") {
  const value = String(path || "/");

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const normalizedPath = value.startsWith("/") ? value : `/${value}`;
  return `${SITE_SEO.siteUrl}${normalizedPath}`;
}

export function formatSeoTitle(title) {
  const normalizedTitle = String(title || "").trim();

  if (!normalizedTitle) {
    return SITE_SEO.defaultTitle;
  }

  return normalizedTitle.includes(SITE_SEO.siteName)
    ? normalizedTitle
    : `${normalizedTitle} | ${SITE_SEO.siteName}`;
}

export function stripHtml(value) {
  return String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncateText(value, maxLength = 155) {
  const cleanText = stripHtml(value);

  if (cleanText.length <= maxLength) {
    return cleanText;
  }

  return `${cleanText.slice(0, maxLength - 3).trim()}...`;
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: SITE_SEO.siteName,
    description: SITE_SEO.defaultDescription,
    url: SITE_SEO.siteUrl,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(SITE_SEO.defaultImage),
      width: 512,
      height: 512,
    },
    address: {
      "@type": "PostalAddress",
      ...SITE_SEO.address,
    },
    contactPoint: SITE_SEO.phone
      ? {
          "@type": "ContactPoint",
          telephone: SITE_SEO.phone,
          contactType: "customer service",
          areaServed: "VN",
          availableLanguage: ["vi"],
        }
      : undefined,
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: SITE_SEO.siteName,
    url: SITE_SEO.siteUrl,
    publisher: {
      "@id": absoluteUrl("/#organization"),
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/products")}?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "GardenStore",
    "@id": absoluteUrl("/#local-business"),
    name: SITE_SEO.siteName,
    description: SITE_SEO.defaultDescription,
    image: absoluteUrl(SITE_SEO.defaultImage),
    url: SITE_SEO.siteUrl,
    telephone: SITE_SEO.phone || undefined,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      ...SITE_SEO.address,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "20:00",
      },
    ],
  };
}

export function buildBreadcrumbSchema(items = []) {
  const itemListElement = items
    .filter((item) => item?.name)
    .map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path ? absoluteUrl(item.path) : undefined,
    }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}
