const benefits = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 0c0 4.97-2 8-4.5 10M12 3c0 4.97 2 8 4.5 10" />
      </svg>
    ),
    title: 'Cây khỏe mạnh',
    description:
      'Cây được tuyển chọn kỹ lưỡng và chăm sóc cẩn thận trước khi giao đến tay bạn.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1zm0 0h2a2 2 0 002-2v-4a2 2 0 00-2-2h-2m0 8v1a1 1 0 001 1h2m0 0a2 2 0 002-2m0 0V9" />
      </svg>
    ),
    title: 'Giao hàng nhanh',
    description:
      'Giao hàng nhanh chóng trong vòng 24–48 giờ. Đóng gói cẩn thận, cây đến tay luôn tươi.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 11-12.728 0M12 3v9" />
      </svg>
    ),
    title: 'Hỗ trợ chăm sóc cây',
    description:
      'Hướng dẫn chi tiết và tư vấn tận tình giúp bạn chăm sóc cây tốt hơn mỗi ngày.',
  },
]

function BenefitsSection() {
  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="text-green-600 font-medium text-sm uppercase tracking-widest">
            Cam kết của chúng tôi
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-2">
            Vì sao nên chọn cây tại cửa hàng chúng tôi
          </h2>
          <div className="w-16 h-1 bg-green-500 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-2xl mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection
