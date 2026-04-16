import { Link } from "react-router-dom";

const posts = [
  {
    id: 1,
    image: "https://placehold.co/600x400/d1fae5/16a34a?text=Mẹo+Chăm+Sóc",
    title: "Cách tưới nước đúng cách cho cây trong nhà",
    description:
      "Tưới nước quá nhiều hay quá ít đều gây hại cho cây. Tìm hiểu cách nhận biết nhu cầu nước của từng loại cây.",
    date: "01 Tháng 3, 2026",
  },
  {
    id: 2,
    image: "https://placehold.co/600x400/bbf7d0/15803d?text=Ánh+Sáng",
    title: "Chọn vị trí đặt cây để nhận đủ ánh sáng",
    description:
      "Ánh sáng đóng vai trò quan trọng giúp cây quang hợp. Hãy biết cách bố trí cây phù hợp với từng góc nhà.",
    date: "20 Tháng 2, 2026",
  },
  {
    id: 3,
    image: "https://placehold.co/600x400/a7f3d0/065f46?text=Đất+Trồng",
    title: "Bí quyết chọn đất trồng cây phù hợp",
    description:
      "Đất trồng tốt là nền tảng để cây phát triển khoẻ mạnh. Khám phá cách pha chế đất trồng đơn giản tại nhà.",
    date: "10 Tháng 2, 2026",
  },
];

function BlogSection() {
  return (
    <section className="py-20 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <span className="text-emerald-600 font-medium tracking-widest text-sm uppercase">
              KIẾN THỨC HỮU ÍCH
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-green-900 mt-3">
              Mẹo chăm sóc cây
            </h2>
          </div>

          <Link
            to="/blog"
            className="text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-2 group"
          >
            Xem tất cả bài viết
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>

        {/* Danh sách bài viết */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300"
            >
              {/* Ảnh bài viết */}
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Nội dung */}
              <div className="p-8">
                <p className="text-emerald-600 text-sm font-medium">
                  {post.date}
                </p>

                <h3 className="font-semibold text-xl leading-tight mt-3 mb-4 line-clamp-2 text-gray-900 group-hover:text-emerald-700 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-600 text-[15px] line-clamp-3 leading-relaxed">
                  {post.description}
                </p>

                {/* Link đọc thêm */}
                <Link
                  to={`/blog/${post.id}`}
                  className="mt-6 inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-medium group-hover:gap-3 transition-all"
                >
                  Đọc thêm
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
