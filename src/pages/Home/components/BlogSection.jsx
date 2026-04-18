import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { getAllBlogPosts } from "../../../services/blogService";

function normalizePost(post) {
  return {
    id: post?._id?.$oid || post?._id || post?.slug,
    title: post?.title || "Bài viết chưa có tiêu đề",
    slug: post?.slug || "",
    summary: post?.summary || "",
    thumbnail:
      post?.thumbnail ||
      "https://placehold.co/600x400/d1fae5/16a34a?text=Ki%E1%BA%BFn+Th%E1%BB%A9c",
    categoryName: post?.category?.name || "Kiến thức",
    publishedAt: post?.publishedAt?.$date || post?.publishedAt || null,
  };
}

function formatDate(dateString) {
  if (!dateString) return "Chưa có ngày đăng";
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
}

function BlogSection() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        const data = await getAllBlogPosts();
        setBlogPosts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Lỗi tải bài viết cho trang chủ:", error);
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  // Lấy 3 bài viết mới nhất đã xuất bản
  const featuredPosts = useMemo(() => {
    return blogPosts
      .map(normalizePost)
      .filter((post) => post.slug) // chỉ lấy bài có slug
      .sort((a, b) => {
        const dateA = new Date(a.publishedAt || 0).getTime();
        const dateB = new Date(b.publishedAt || 0).getTime();
        return dateB - dateA;
      })
      .slice(0, 3);
  }, [blogPosts]);

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
              Mẹo chăm sóc cây cảnh
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
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl overflow-hidden h-[420px] animate-pulse"
              />
            ))}
          </div>
        ) : featuredPosts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Chưa có bài viết nào. Hãy thêm bài viết trong quản trị.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <div
                key={post.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300"
              >
                {/* Ảnh bài viết */}
                <div className="relative overflow-hidden">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {post.categoryName && (
                    <span className="absolute top-4 left-4 bg-white/90 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {post.categoryName}
                    </span>
                  )}
                </div>

                {/* Nội dung */}
                <div className="p-8">
                  <p className="text-emerald-600 text-sm font-medium">
                    {formatDate(post.publishedAt)}
                  </p>

                  <h3 className="font-semibold text-xl leading-tight mt-3 mb-4 line-clamp-2 text-gray-900 group-hover:text-emerald-700 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-[15px] line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>

                  {/* Link đọc thêm */}
                  <Link
                    to={`/blog/${post.slug}`}
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
        )}
      </div>
    </section>
  );
}

export default BlogSection;
