import { useLocation } from "react-router-dom";
import {
  buildBreadcrumbSchema,
  buildLocalBusinessSchema,
  buildOrganizationSchema,
  buildWebsiteSchema,
  SITE_SEO,
} from "../../config/seo";
import Seo from "./Seo";

const STATIC_ROUTE_SEO = {
  "/": {
    title: SITE_SEO.defaultTitle,
    description: SITE_SEO.defaultDescription,
    jsonLd: [
      buildOrganizationSchema(),
      buildWebsiteSchema(),
      buildLocalBusinessSchema(),
    ],
  },
  "/products": {
    title: "Mua cây cảnh trong nhà, cây để bàn và cây phong thủy",
    description:
      "Khám phá bộ sưu tập cây cảnh trong nhà, cây để bàn, cây phong thủy và chậu cây phù hợp cho nhà ở, văn phòng tại Góc Xanh.",
    jsonLd: [
      buildBreadcrumbSchema([
        { name: "Trang chủ", path: "/" },
        { name: "Sản phẩm", path: "/products" },
      ]),
    ],
  },
  "/blog": {
    title: "Kiến thức chăm sóc cây cảnh",
    description:
      "Bài viết hướng dẫn chọn cây, tưới nước, chăm sóc cây cảnh trong nhà và bố trí cây xanh cho không gian sống.",
    jsonLd: [
      buildBreadcrumbSchema([
        { name: "Trang chủ", path: "/" },
        { name: "Kiến thức", path: "/blog" },
      ]),
    ],
  },
  "/stores": {
    title: "Hệ thống cửa hàng cây cảnh tại TP.HCM",
    description:
      "Thông tin showroom, kho hàng và vườn ươm của Góc Xanh tại TP.HCM, kèm bản đồ, hotline và giờ mở cửa.",
    jsonLd: [
      buildLocalBusinessSchema(),
      buildBreadcrumbSchema([
        { name: "Trang chủ", path: "/" },
        { name: "Cửa hàng", path: "/stores" },
      ]),
    ],
  },
  "/support": {
    title: "Hỗ trợ khách hàng",
    description:
      "Liên hệ Góc Xanh để được tư vấn chọn cây, chăm sóc cây, giao hàng và hỗ trợ đơn hàng nhanh chóng.",
    jsonLd: [
      buildBreadcrumbSchema([
        { name: "Trang chủ", path: "/" },
        { name: "Hỗ trợ", path: "/support" },
      ]),
    ],
  },
  "/about": {
    title: "Về Góc Xanh",
    description:
      "Góc Xanh mang cây xanh vào không gian sống và làm việc với sản phẩm chất lượng, giao hàng đúng hẹn và dịch vụ tận tâm.",
    jsonLd: [
      buildOrganizationSchema(),
      buildBreadcrumbSchema([
        { name: "Trang chủ", path: "/" },
        { name: "Về Góc Xanh", path: "/about" },
      ]),
    ],
  },
};

const NOINDEX_PREFIXES = [
  "/admin",
  "/cart",
  "/checkout",
  "/login",
  "/register",
  "/test-counter",
];

function normalizePathname(pathname) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname || "/";
}

function getRouteSeo(pathname) {
  if (STATIC_ROUTE_SEO[pathname]) {
    return {
      canonicalPath: pathname,
      ...STATIC_ROUTE_SEO[pathname],
    };
  }

  if (pathname.startsWith("/products/")) {
    return {
      title: "Chi tiết sản phẩm cây cảnh",
      description:
        "Thông tin chi tiết sản phẩm cây cảnh, giá bán, tình trạng còn hàng và hướng dẫn chăm sóc tại Góc Xanh.",
      canonicalPath: pathname,
      jsonLd: [
        buildBreadcrumbSchema([
          { name: "Trang chủ", path: "/" },
          { name: "Sản phẩm", path: "/products" },
          { name: "Chi tiết sản phẩm", path: pathname },
        ]),
      ],
    };
  }

  if (pathname.startsWith("/blog/")) {
    return {
      title: "Bài viết kiến thức cây cảnh",
      description:
        "Bài viết hướng dẫn chăm sóc, lựa chọn và bố trí cây cảnh từ Góc Xanh.",
      canonicalPath: pathname,
      type: "article",
      jsonLd: [
        buildBreadcrumbSchema([
          { name: "Trang chủ", path: "/" },
          { name: "Kiến thức", path: "/blog" },
          { name: "Bài viết", path: pathname },
        ]),
      ],
    };
  }

  if (NOINDEX_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return {
      title: "Khu vực không lập chỉ mục",
      description: "Trang nội bộ của Góc Xanh.",
      canonicalPath: pathname,
      robots: "noindex, nofollow",
    };
  }

  return {
    title: "Trang không tồn tại",
    description: "Trang bạn đang tìm không tồn tại hoặc đã được di chuyển.",
    canonicalPath: pathname,
    robots: "noindex, nofollow",
  };
}

function RouteSeo() {
  const location = useLocation();
  const pathname = normalizePathname(location.pathname);
  const routeSeo = getRouteSeo(pathname);

  return <Seo {...routeSeo} />;
}

export default RouteSeo;
