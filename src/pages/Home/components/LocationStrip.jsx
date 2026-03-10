const locations = [
  {
    id: 1,
    title: 'Showroom',
    address: '12 Nguyễn Văn Bảo, Gò Vấp, TP.HCM',
  },
  {
    id: 2,
    title: 'Kho hàng',
    address: '25 Lê Văn Việt, Thủ Đức, TP.HCM',
  },
  {
    id: 3,
    title: 'Vườn ươm',
    address: 'Khu nông nghiệp công nghệ cao, Củ Chi',
  },
]

function LocationStrip() {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-8 sm:gap-0 sm:divide-x sm:divide-gray-200">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="flex-1 text-center px-8"
            >
              <p className="text-gray-800 font-semibold text-base mb-1">
                {loc.title}
              </p>
              <p className="text-green-600 text-sm leading-snug">
                {loc.address}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LocationStrip
