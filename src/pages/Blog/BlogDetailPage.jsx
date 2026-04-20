import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllBlogPosts, getBlogPostBySlug } from "../../services/blogService";

function normalizePost(post) {
    return {
        id: post?._id || post?.slug,
        title: post?.title || "Bài viết chưa có tiêu đề",
        slug: post?.slug || "",
        categoryName: post?.category?.name || "Chưa phân loại",
        authorName: post?.author?.name || "Ban biên tập",
        summary: post?.summary || "",
        content: post?.content || "",
        thumbnail: post?.thumbnail || "",
        tags: Array.isArray(post?.tags) ? post.tags : [],
        viewCount: Number(post?.viewCount || 0),
        publishedAt: post?.publishedAt || null,
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

function splitParagraphs(content) {
    return content
        .split(/\n+/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);
}

function BlogDetailPage() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [allPosts, setAllPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadBlogDetail() {
            try {
                setLoading(true);
                setError("");

                const [postData, listData] = await Promise.all([
                    getBlogPostBySlug(slug),
                    getAllBlogPosts(),
                ]);

                setPost(normalizePost(postData));
                setAllPosts(Array.isArray(listData) ? listData.map(normalizePost) : []);
            } catch (fetchError) {
                console.error(fetchError);
                setError("Không thể tải chi tiết bài viết. Hãy thử lại sau.");
            } finally {
                setLoading(false);
            }
        }

        loadBlogDetail();
    }, [slug]);

    const relatedPosts = useMemo(() => {
        if (!post) return [];

        return allPosts
            .filter((item) => item.slug !== post.slug)
            .sort((a, b) => {
                const sameCategoryA = a.categoryName === post.categoryName ? 1 : 0;
                const sameCategoryB = b.categoryName === post.categoryName ? 1 : 0;
                if (sameCategoryA !== sameCategoryB) return sameCategoryB - sameCategoryA;

                return (
                    new Date(b.publishedAt || 0).getTime() -
                    new Date(a.publishedAt || 0).getTime()
                );
            })
            .slice(0, 4);
    }, [allPosts, post]);

    const paragraphs = useMemo(() => {
        if (!post) return [];
        return splitParagraphs(post.content || post.summary);
    }, [post]);

    if (loading) {
        return (
            <section className="mx-auto max-w-5xl px-4 py-16">
                <p className="text-center text-[#4c5a50]">Đang tải bài viết...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="mx-auto max-w-5xl px-4 py-16 text-center">
                <p className="text-red-600">{error}</p>
                <Link
                    to="/blog"
                    className="mt-5 inline-flex rounded-full border border-[#2f5f40] px-5 py-2 text-sm font-medium text-[#2f5f40]"
                >
                    Quay lại trang kiến thức
                </Link>
            </section>
        );
    }

    if (!post) {
        return (
            <section className="mx-auto max-w-5xl px-4 py-16 text-center">
                <p className="text-[#4c5a50]">Không tìm thấy bài viết.</p>
                <Link
                    to="/blog"
                    className="mt-5 inline-flex rounded-full border border-[#2f5f40] px-5 py-2 text-sm font-medium text-[#2f5f40]"
                >
                    Quay lại trang kiến thức
                </Link>
            </section>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8f6f0] text-[#1f2a21]">
            <section className="border-y border-[#d7d2c4] bg-[#fdfbf5] px-4 py-8">
                <div className="mx-auto max-w-6xl">
                    <div className="flex items-center justify-between border-b border-[#d7d2c4] pb-3">
                        <span className="text-xs uppercase tracking-[0.25em] text-[#5f6b5f]">
                            GÓC XANH TIMES
                        </span>
                        <span className="text-xs text-[#6c756b]">{formatDate(post.publishedAt)}</span>
                    </div>

                    <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_250px]">
                        <div>
                            <p className="inline-flex rounded-full bg-[#2d4f39] px-3 py-1 text-xs font-semibold text-white">
                                {post.categoryName}
                            </p>
                            <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl" style={{ fontFamily: "'Merriweather', 'Times New Roman', serif" }}>
                                {post.title}
                            </h1>
                            <p className="mt-4 text-base leading-8 text-[#4b564d] md:text-lg" style={{ fontFamily: "'Merriweather', 'Times New Roman', serif" }}>
                                {post.summary}
                            </p>
                        </div>

                        <aside className="border-l border-[#d7d2c4] pl-5 lg:pl-6">
                            <p className="text-xs uppercase tracking-[0.2em] text-[#5f6b5f]">Tác giả</p>
                            <p className="mt-2 text-sm font-semibold text-[#2e4534]">{post.authorName}</p>
                            <p className="mt-1 text-sm text-[#657167]">{post.viewCount} lượt xem</p>
                            <div className="mt-5 border-t border-[#d7d2c4] pt-5">
                                <p className="text-xs uppercase tracking-[0.2em] text-[#5f6b5f]">Chủ đề</p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={`${post.slug}-${tag}`}
                                            className="rounded-full bg-[#ebe6d6] px-2.5 py-1 text-xs text-[#2f4a37]"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-4 py-10">
                <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
                    <article className="rounded-2xl border border-[#e3ddce] bg-white p-6 md:p-10">
                        <img
                            src={post.thumbnail}
                            alt={post.title}
                            className="h-64 w-full rounded-xl object-cover md:h-105"
                        />

                        <div className="mt-8 space-y-6 text-[18px] leading-9 text-[#29352d]" style={{ fontFamily: "'Merriweather', 'Times New Roman', serif" }}>
                            {paragraphs.map((paragraph, index) => (
                                <p
                                    key={`${post.slug}-paragraph-${index}`}
                                    className={index === 0 ? "first-letter:mr-1 first-letter:float-left first-letter:text-6xl first-letter:font-bold first-letter:leading-none first-letter:text-[#2f5f40]" : ""}
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </article>

                    <aside className="space-y-5">
                        <div className="rounded-2xl border border-[#dfd8c8] bg-[#fffdf8] p-5">
                            <p className="text-xs uppercase tracking-[0.22em] text-[#5f6b5f]">
                                Điều hướng nhanh
                            </p>
                            <div className="mt-4 space-y-3">
                                <Link
                                    to="/blog"
                                    className="block rounded-lg border border-[#cfd7c8] px-3 py-2 text-sm font-medium text-[#2f5f40]"
                                >
                                    ← Quay lại trang kiến thức
                                </Link>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-[#dfd8c8] bg-[#fffdf8] p-5">
                            <p className="text-xs uppercase tracking-[0.22em] text-[#5f6b5f]">
                                Bài liên quan
                            </p>
                            <div className="mt-4 space-y-4">
                                {relatedPosts.length === 0 ? (
                                    <p className="text-sm text-[#5f6b5f]">Chưa có bài liên quan.</p>
                                ) : (
                                    relatedPosts.map((relatedPost) => (
                                        <Link
                                            key={relatedPost.slug}
                                            to={`/blog/${relatedPost.slug}`}
                                            className="block rounded-xl border border-[#e6e0d3] bg-white p-3 transition hover:border-[#a8b7a5]"
                                        >
                                            <p className="text-[11px] uppercase tracking-[0.18em] text-[#6f786f]">
                                                {relatedPost.categoryName}
                                            </p>
                                            <p className="mt-1 text-sm font-semibold leading-6 text-[#2a3d30]">
                                                {relatedPost.title}
                                            </p>
                                            <p className="mt-1 text-xs text-[#6f786f]">
                                                {formatDate(relatedPost.publishedAt)}
                                            </p>
                                        </Link>
                                    ))
                                )}
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </div>
    );
}

export default BlogDetailPage;
