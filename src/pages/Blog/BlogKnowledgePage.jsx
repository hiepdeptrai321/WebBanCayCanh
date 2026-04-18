import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBlogPosts } from "../../services/blogService";

function normalizePost(post) {
    return {
        id: post?._id?.$oid || post?._id || post?.slug,
        title: post?.title || "Bài viết chưa có tiêu đề",
        slug: post?.slug || "",
        categoryName: post?.category?.name || "Chưa phân loại",
        authorName: post?.author?.name || "Ban biên tập",
        summary: post?.summary || "",
        content: post?.content || "",
        thumbnail: post?.thumbnail || "",
        tags: Array.isArray(post?.tags) ? post.tags : [],
        viewCount: Number(post?.viewCount || 0),
        isPublished: Boolean(post?.isPublished),
        publishedAt: post?.publishedAt?.$date || post?.publishedAt || null,
    };
}

function formatDate(dateString) {
    if (!dateString) return "Chưa có ngày đăng";

    return new Intl.DateTimeFormat("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(new Date(dateString));
}

function BlogKnowledgePage() {
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedTopic, setSelectedTopic] = useState("all");
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadBlogPosts() {
            try {
                setLoading(true);
                setError("");
                const data = await getAllBlogPosts();
                setBlogPosts(Array.isArray(data) ? data : []);
            } catch (fetchError) {
                console.error(fetchError);
                setError("Không thể tải bài viết từ API. Hãy kiểm tra backend ở cổng 5000.");
            } finally {
                setLoading(false);
            }
        }

        loadBlogPosts();
    }, []);

    const posts = useMemo(() => {
        return blogPosts
            .map(normalizePost)
            .filter((post) => post.isPublished)
            .sort(
                (a, b) =>
                    new Date(b.publishedAt || 0).getTime() -
                    new Date(a.publishedAt || 0).getTime()
            );
                }, [blogPosts]);

    const categories = useMemo(() => {
        return [...new Set(posts.map((post) => post.categoryName))];
    }, [posts]);

    const topics = useMemo(() => {
        const topicSet = new Set();
        posts.forEach((post) => {
            post.tags.forEach((tag) => topicSet.add(tag));
        });
        return [...topicSet];
    }, [posts]);

    const filteredPosts = useMemo(() => {
        const keyword = searchText.trim().toLowerCase();

        return posts.filter((post) => {
            const matchCategory =
                selectedCategory === "all" || post.categoryName === selectedCategory;

            const matchTopic =
                selectedTopic === "all" || post.tags.includes(selectedTopic);

            const matchKeyword =
                keyword.length === 0 ||
                post.title.toLowerCase().includes(keyword) ||
                post.summary.toLowerCase().includes(keyword) ||
                post.content.toLowerCase().includes(keyword) ||
                post.tags.some((tag) => tag.toLowerCase().includes(keyword));

            return matchCategory && matchTopic && matchKeyword;
        });
    }, [posts, searchText, selectedCategory, selectedTopic]);

    return (
        <div className="min-h-screen bg-[#f7faf5]">
            <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#8eb88f,#2f5f40_55%,#224131)] px-4 py-24 text-white">
                <div className="mx-auto max-w-7xl">
                    <p className="mb-3 text-sm uppercase tracking-[0.22em] text-[#d9f7db]">
                        Góc Xanh Knowledge
                    </p>
                    <h1 className="max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
                        Kiến thức cây cảnh cho không gian sống xanh và bền vững
                    </h1>
                    <p className="mt-6 max-w-4xl text-base leading-8 text-[#e7f8e8] md:text-lg">
                        Trang kiến thức cây cảnh cung cấp các bài viết, hướng dẫn và thông tin hữu
                        ích về cách chăm sóc cây cảnh, lựa chọn cây phù hợp với không gian sống,
                        cũng như các mẹo trồng và bảo dưỡng cây. Người dùng có thể đọc các bài viết
                        để nâng cao kiến thức về cây cảnh, tìm kiếm theo chủ đề hoặc danh mục bài
                        viết.
                    </p>
                </div>
            </section>

            {loading && (
                <section className="mx-auto max-w-7xl px-4 py-12">
                    <p className="text-center text-[#526456]">Loading articles...</p>
                </section>
            )}

            {!loading && error && (
                <section className="mx-auto max-w-7xl px-4 py-12">
                    <p className="text-center text-red-600">{error}</p>
                </section>
            )}

            {!loading && !error && (
            <section className="mx-auto max-w-7xl px-4 py-10">
                <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
                    <aside className="space-y-6 rounded-2xl border border-[#d7e5d4] bg-white p-5 shadow-sm">
                        <div>
                            <label
                                htmlFor="knowledge-search"
                                className="mb-2 block text-sm font-semibold text-[#2f5f40]"
                            >
                                Tìm kiếm bài viết
                            </label>
                            <input
                                id="knowledge-search"
                                type="text"
                                value={searchText}
                                onChange={(event) => setSearchText(event.target.value)}
                                placeholder="Nhập tiêu đề, nội dung, chủ đề..."
                                className="w-full rounded-xl border border-[#cfe0cc] px-3 py-2.5 text-sm outline-none transition focus:border-[#5f8d67]"
                            />
                        </div>

                        <div>
                            <h2 className="mb-3 text-sm font-semibold text-[#2f5f40]">
                                Danh mục bài viết
                            </h2>
                            <div className="space-y-2">
                                <button
                                    onClick={() => setSelectedCategory("all")}
                                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                                        selectedCategory === "all"
                                            ? "bg-[#dff0dd] font-medium text-[#244f34]"
                                            : "text-[#4e5f52] hover:bg-[#f1f7ef]"
                                    }`}
                                >
                                    Tất cả
                                </button>

                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                                            selectedCategory === category
                                                ? "bg-[#dff0dd] font-medium text-[#244f34]"
                                                : "text-[#4e5f52] hover:bg-[#f1f7ef]"
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="mb-3 text-sm font-semibold text-[#2f5f40]">
                                Chủ đề nổi bật
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setSelectedTopic("all")}
                                    className={`rounded-full px-3 py-1 text-xs transition ${
                                        selectedTopic === "all"
                                            ? "bg-[#2f5f40] text-white"
                                            : "bg-[#ecf5ea] text-[#355e43]"
                                    }`}
                                >
                                    Tất cả
                                </button>

                                {topics.map((topic) => (
                                    <button
                                        key={topic}
                                        onClick={() => setSelectedTopic(topic)}
                                        className={`rounded-full px-3 py-1 text-xs transition ${
                                            selectedTopic === topic
                                                ? "bg-[#2f5f40] text-white"
                                                : "bg-[#ecf5ea] text-[#355e43]"
                                        }`}
                                    >
                                        {topic}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    <div>
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-[#2d4131] md:text-2xl">
                                Bài viết kiến thức
                            </h2>
                            <p className="text-sm text-[#59705f]">
                                {filteredPosts.length} bài viết phù hợp
                            </p>
                        </div>

                        {filteredPosts.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-[#bfd1bc] bg-white px-6 py-12 text-center">
                                <p className="text-lg font-semibold text-[#314a37]">
                                    Không tìm thấy bài viết phù hợp
                                </p>
                                <p className="mt-2 text-sm text-[#59705f]">
                                    Hãy thử thay đổi từ khóa, chủ đề hoặc danh mục.
                                </p>
                            </div>
                        ) : (
                            <div className="grid gap-5 sm:grid-cols-2">
                                {filteredPosts.map((post) => (
                                    <article
                                        key={post.id}
                                        className="overflow-hidden rounded-2xl border border-[#dbe8d7] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                                    >
                                        <div className="relative h-52 overflow-hidden bg-[#edf4ea]">
                                            <img
                                                src={post.thumbnail}
                                                alt={post.title}
                                                className="h-full w-full object-cover"
                                            />
                                            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#30563d]">
                                                {post.categoryName}
                                            </span>
                                        </div>

                                        <div className="space-y-3 p-5">
                                            <p className="text-xs text-[#6c7c70]">
                                                {formatDate(post.publishedAt)} • {post.viewCount} lượt xem
                                            </p>
                                            <h3 className="text-lg font-semibold leading-7 text-[#263a2b]">
                                                {post.title}
                                            </h3>
                                            <p className="text-sm leading-6 text-[#526456]">
                                                {post.summary}
                                            </p>
                                            <p className="text-xs text-[#6c7c70]">
                                                Tác giả: {post.authorName}
                                            </p>
                                            <div className="flex flex-wrap gap-2 pt-1">
                                                {post.tags.map((tag) => (
                                                    <span
                                                        key={`${post.id}-${tag}`}
                                                        className="rounded-full bg-[#eef6eb] px-2.5 py-1 text-xs text-[#3b6148]"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <Link
                                                to={`/blog/${post.slug}`}
                                                className="inline-flex items-center gap-1 rounded-full bg-[#ecf5ea] px-3 py-1.5 text-sm font-semibold text-[#2f5f40] transition hover:bg-[#dff0dd] hover:text-[#1f3f2b]"
                                            >
                                                Đọc bài viết
                                                <span aria-hidden="true">→</span>
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
            )}
        </div>
    );
}

export default BlogKnowledgePage;