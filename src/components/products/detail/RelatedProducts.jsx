import { Link } from "react-router-dom";
import { formatPrice, getProductImage } from "../../../utils/productDetailHelpers.js";

function RelatedProducts({ relatedProducts, fallbackCategoryName }) {
  if (!relatedProducts.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6 lg:px-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6d876f]">Gợi ý thêm</p>
          <h2 className="mt-2 text-3xl font-bold text-[#163020]">Sản phẩm liên quan</h2>
        </div>

        <Link
          to="/products"
          className="rounded-full border border-[#d7e1d5] bg-white px-5 py-3 text-sm font-semibold text-[#21422d] transition hover:border-[#8bad8f] hover:text-[#0f5132]"
        >
          Xem tất cả
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {relatedProducts.map((item) => {
          const itemImage = getProductImage(item);
          const sale = item?.discountPrice > 0 ? item.discountPrice : item.price;
          const productPath = `/products/${item.slug || item._id}`;

          return (
            <Link
              key={item._id}
              to={productPath}
              className="group overflow-hidden rounded-[28px] border border-[#e4eadf] bg-white shadow-[0_14px_40px_rgba(20,45,30,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(20,45,30,0.1)]"
            >
              <div className="overflow-hidden">
                <img
                  src={itemImage}
                  alt={item.name}
                  className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6d876f]">
                  {item.categoryName || fallbackCategoryName}
                </p>
                <h3 className="mt-2 line-clamp-2 text-lg font-bold text-[#203320]">{item.name}</h3>
                <p className="mt-3 text-xl font-bold text-[#0f5132]">{formatPrice(sale)}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default RelatedProducts;
