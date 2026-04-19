import {
  normalizeReviewAuthor,
  normalizeReviewDate,
  normalizeReviewRating,
} from "../../../utils/productDetailHelpers.js";
import StarRating from "./StarRating.jsx";

const tabs = (reviewsCount) => [
  { id: "description", label: "Mô tả chi tiết" },
  { id: "specs", label: "Thông số & chăm sóc" },
  { id: "reviews", label: `Đánh giá (${reviewsCount})` },
];

function ProductDetailTabs({
  product,
  specs,
  reviews,
  averageRating,
  activeTab,
  onChangeTab,
}) {
  return (
    <div className="overflow-hidden rounded-[32px] border border-[#e3e9de] bg-white shadow-[0_18px_60px_rgba(20,45,30,0.08)]">
      <div className="flex flex-wrap border-b border-[#edf1eb]">
        {tabs(reviews.length).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChangeTab(tab.id)}
            className={`px-6 py-4 text-sm font-semibold transition md:px-8 ${
              activeTab === tab.id
                ? "bg-[#f4f8f2] text-[#0f5132]"
                : "text-[#617061] hover:bg-[#fafcf9]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6 md:p-8">
        {activeTab === "description" && (
          <div className="space-y-5 leading-8 text-[#4f5f50]">
            <p>{product.description || "Thông tin chi tiết của sản phẩm đang được cập nhật."}</p>

            {Array.isArray(product.attributes) && product.attributes.length > 0 && (
              <div className="grid gap-4 md:grid-cols-2">
                {product.attributes.map((item, index) => (
                  <div
                    key={`${item?.name || "attribute"}-${index}`}
                    className="rounded-2xl border border-[#ebf0e8] bg-[#fbfcfa] p-4"
                  >
                    <p className="text-sm font-semibold text-[#21422d]">{item?.name}</p>
                    <p className="mt-2 text-sm text-[#5a6c5b]">{item?.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "specs" && (
          <div className="grid gap-4 md:grid-cols-2">
            {specs.map((item) => (
              <div
                key={item.label}
                className="flex items-start justify-between gap-4 rounded-2xl border border-[#edf1eb] bg-[#fcfdfb] p-4"
              >
                <span className="text-sm font-medium text-[#667466]">{item.label}</span>
                <span className="text-right font-semibold text-[#203320]">{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            {reviews.length > 0 ? (
              <div className="space-y-5">
                <div className="rounded-[24px] bg-[#f7fbf6] p-5">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-4xl font-bold text-[#163020]">{averageRating.toFixed(1)}</span>
                    <div>
                      <StarRating value={averageRating} size="lg" />
                      <p className="mt-2 text-sm text-[#647264]">
                        Dựa trên {reviews.length} đánh giá từ khách hàng
                      </p>
                    </div>
                  </div>
                </div>

                {reviews.map((review, index) => (
                  <div
                    key={review?._id || index}
                    className="rounded-[24px] border border-[#ecf1e8] bg-[#fcfdfb] p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-[#203320]">{normalizeReviewAuthor(review)}</p>
                        <p className="mt-1 text-sm text-[#708070]">{normalizeReviewDate(review)}</p>
                      </div>
                      <StarRating value={normalizeReviewRating(review)} />
                    </div>
                    <p className="mt-4 leading-7 text-[#536253]">
                      {review?.comment ||
                        review?.content ||
                        "Khách hàng chưa để lại nội dung đánh giá."}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-[24px] bg-[#f8faf7] p-8 text-center">
                <p className="text-lg font-semibold text-[#203320]">Chưa có đánh giá nào</p>
                <p className="mt-2 text-[#697869]">
                  Hãy là người đầu tiên để lại cảm nhận về sản phẩm này.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetailTabs;
