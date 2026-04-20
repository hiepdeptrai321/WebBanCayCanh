import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBlogPosts } from "../../services/blogService";
import shopBackground from "../../assets/images/storeBackground.png";

const MAX_FEATURED_TOPICS = 12;
const POST_TAGS_PREVIEW_COUNT = 4;
const FALLBACK_THUMBNAIL = "https://placehold.co/1200x800/d1fae5/065f46?text=Kien+thuc+cay+canh";

function normalizePost(post) {
    return {
        id: post?._id?.$oid || post?._id || post?.slug,
        title: post?.title || "Bài viết chưa có tiêu đề",
        slug: post?.slug || "",
        categoryName: post?.category?.name || "Chưa phân loại",
        authorName: post?.author?.name || "Ban biên tập",
        summary: post?.summary || "",
        content: post?.content || "",
        thumbnail: post?.thumbnail || FALLBACK_THUMBNAIL,
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
        const topicFrequency = new Map();

        posts.forEach((post) => {
            post.tags.forEach((tag) => {
                const normalizedTag = String(tag || "").trim();
                if (!normalizedTag) {
                    return;
                }

                topicFrequency.set(normalizedTag, (topicFrequency.get(normalizedTag) || 0) + 1);
            });
        });

        return [...topicFrequency.entries()]
            .sort((a, b) => {
                if (b[1] !== a[1]) {
                    return b[1] - a[1];
                }

                return a[0].localeCompare(b[0], "vi");
            })
            .slice(0, MAX_FEATURED_TOPICS)
            .map(([topic]) => topic);
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
        <div className="min-h-screen bg-emerald-50/50">
            <section className="relative overflow-hidden px-4 py-24 text-white">
                <div className="absolute inset-0">
                    <img
                        src={shopBackground}
                        alt="Không gian cửa hàng cây cảnh"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-br from-emerald-950/75 via-emerald-900/65 to-green-800/70" />
                </div>
                <div className="absolute -top-20 -left-12 h-72 w-72 rounded-full bg-white/15 blur-2xl" />
                <div className="absolute -right-14 bottom-0 h-80 w-80 rounded-full bg-black/20 blur-3xl" />
                <div className="relative mx-auto max-w-7xl">
                    <p className="mb-3 text-sm uppercase tracking-[0.22em] text-green-100">
                        Kiến thức Góc Xanh
                    </p>
                    <h1 className="max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
                        Kiến thức cây cảnh cho không gian sống xanh và bền vững
                    </h1>
                    <p className="mt-6 max-w-4xl text-base leading-8 text-emerald-50/95 md:text-lg">
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
                    <p className="text-center text-emerald-700">Đang tải bài viết...</p>
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
                    <aside className="space-y-6 rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm">
                        <div>
                            <label
                                htmlFor="knowledge-search"
                                className="mb-2 block text-sm font-semibold text-emerald-800"
                            >
                                Tìm kiếm bài viết
                            </label>
                            <input
                                id="knowledge-search"
                                type="text"
                                value={searchText}
                                onChange={(event) => setSearchText(event.target.value)}
                                placeholder="Nhập tiêu đề, nội dung, chủ đề..."
                                className="w-full rounded-xl border border-emerald-100 px-3 py-2.5 text-sm outline-none transition focus:border-emerald-400"
                            />
                        </div>

                        <div>
                            <h2 className="mb-3 text-sm font-semibold text-emerald-800">
                                Danh mục bài viết
                            </h2>
                            <div className="space-y-2">
                                <button
                                    onClick={() => setSelectedCategory("all")}
                                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                                        selectedCategory === "all"
                                            ? "bg-emerald-100 font-medium text-emerald-900"
                                            : "text-emerald-700 hover:bg-emerald-50"
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
                                                ? "bg-emerald-100 font-medium text-emerald-900"
                                                : "text-emerald-700 hover:bg-emerald-50"
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="mb-3 text-sm font-semibold text-emerald-800">
                                Chủ đề nổi bật
                            </h2>
                            <p className="mb-3 text-xs text-emerald-600">
                                Hiển thị tối đa {MAX_FEATURED_TOPICS} từ khóa nổi bật nhất
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setSelectedTopic("all")}
                                    className={`rounded-full px-3 py-1 text-xs transition ${
                                        selectedTopic === "all"
                                            ? "bg-emerald-700 text-white"
                                            : "bg-emerald-50 text-emerald-700"
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
                                                ? "bg-emerald-700 text-white"
                                                : "bg-emerald-50 text-emerald-700"
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
                            <h2 className="text-xl font-bold text-emerald-950 md:text-2xl">
                                Bài viết kiến thức
                            </h2>
                            <p className="text-sm text-emerald-700">
                                {filteredPosts.length} bài viết phù hợp
                            </p>
                        </div>

                        {filteredPosts.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-emerald-200 bg-white px-6 py-12 text-center">
                                <p className="text-lg font-semibold text-emerald-900">
                                    Không tìm thấy bài viết phù hợp
                                </p>
                                <p className="mt-2 text-sm text-emerald-700">
                                    Hãy thử thay đổi từ khóa, chủ đề hoặc danh mục.
                                </p>
                            </div>
                        ) : (
                            <div className="grid gap-5 sm:grid-cols-2">
                                {filteredPosts.map((post) => (
                                    <article
                                        key={post.id}
                                        className="flex h-full flex-col overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                                    >
                                        <div className="relative h-52 overflow-hidden bg-emerald-50">
                                            <img
                                                src={post.thumbnail}
                                                alt={post.title}
                                                className="h-full w-full object-cover"
                                            />
                                            <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-emerald-700">
                                                {post.categoryName}
                                            </span>
                                        </div>

                                        <div className="flex flex-1 flex-col p-5">
                                            <p className="text-xs text-emerald-700">
                                                {formatDate(post.publishedAt)} • {post.viewCount} lượt xem
                                            </p>
                                            <h3 className="mt-2 line-clamp-2 min-h-14 text-lg font-semibold leading-7 text-emerald-950">
                                                {post.title}
                                            </h3>
                                            <p className="mt-2 line-clamp-3 min-h-18 text-sm leading-6 text-emerald-700">
                                                {post.summary}
                                            </p>
                                            <p className="mt-2 text-xs text-emerald-700">
                                                Tác giả: {post.authorName}
                                            </p>
                                            <div className="mt-3 flex min-h-12 flex-wrap content-start gap-2">
                                                {post.tags.slice(0, POST_TAGS_PREVIEW_COUNT).map((tag) => (
                                                    <span
                                                        key={`${post.id}-${tag}`}
                                                        className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs text-emerald-700"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                                {post.tags.length > POST_TAGS_PREVIEW_COUNT && (
                                                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs text-emerald-700">
                                                        +{post.tags.length - POST_TAGS_PREVIEW_COUNT}
                                                    </span>
                                                )}
                                            </div>

                                            <Link
                                                to={`/blog/${post.slug}`}
                                                className="mt-auto inline-flex items-center gap-1 self-start rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 hover:text-emerald-800"
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