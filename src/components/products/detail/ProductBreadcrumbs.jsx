import { Link } from "react-router-dom";

function ProductBreadcrumbs({ productName }) {
  return (
    <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[#6e7b6f]">
      <Link to="/" className="transition hover:text-[#0f5132]">
        Trang chủ
      </Link>
      <span>/</span>
      <Link to="/products" className="transition hover:text-[#0f5132]">
        Sản phẩm
      </Link>
      <span>/</span>
      <span className="font-medium text-[#234b33]">{productName}</span>
    </nav>
  );
}

export default ProductBreadcrumbs;
