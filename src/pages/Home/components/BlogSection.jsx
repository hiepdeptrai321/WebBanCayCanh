const posts = [
  {
    id: 1,
    image: 'https://placehold.co/600x400/d1fae5/16a34a?text=Mẹo+Chăm+Sóc',
    title: 'Cách tưới nước đúng cách cho cây trong nhà',
    description:
      'Tưới nước quá nhiều hay quá ít đều gây hại cho cây. Tìm hiểu cách nhận biết nhu cầu nước của từng loại cây.',
    date: '01 Tháng 3, 2026',
  },
  {
    id: 2,
    image: 'https://placehold.co/600x400/bbf7d0/15803d?text=Ánh+Sáng',
    title: 'Chọn vị trí đặt cây để nhận đủ ánh sáng',
    description:
      'Ánh sáng đóng vai trò quan trọng giúp cây quang hợp. Hãy biết cách bố trí cây phù hợp với từng góc nhà.',
    date: '20 Tháng 2, 2026',
  },
  {
    id: 3,
    image: 'https://placehold.co/600x400/a7f3d0/065f46?text=Đất+Trồng',
    title: 'Bí quyết chọn đất trồng cây phù hợp',
    description:
      'Đất trồng tốt là nền tảng để cây phát triển khoẻ mạnh. Khám phá cách pha chế đất trồng đơn giản tại nhà.',
    date: '10 Tháng 2, 2026',
  },
]

function BlogSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="text-green-600 font-medium text-sm uppercase tracking-widest">
            Kiến thức hữu ích
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-2">
            Mẹo chăm sóc cây
          </h2>
          <div className="w-16 h-1 bg-green-500 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group border border-gray-100"
            >
              <div className="overflow-hidden h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <p className="text-xs text-gray-400 mb-2">{post.date}</p>
                <h3 className="text-base font-bold text-gray-800 mb-2 leading-snug line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.description}
                </p>
                <button className="text-green-600 hover:text-green-700 font-semibold text-sm inline-flex items-center gap-1 transition-colors">
                  Đọc thêm
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogSection
