import { Building2, Clock3, MapPin, Navigation } from "lucide-react";

function SupportLocationSection() {
  return (
    <section className="bg-[#f7f8f3] py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-10">
          <h2 className="text-3xl font-bold text-emerald-900 md:text-4xl">
            Vị trí cửa hàng
          </h2>
          <p className="mt-3 max-w-3xl text-gray-600">
            Khu vực bản đồ mẫu đã được chuẩn bị để dễ thay thế bằng Google Maps
            hoặc bản đồ tương tác khi cần tích hợp dữ liệu thật.
          </p>
        </div>

        <div className="grid gap-6 rounded-3xl border border-emerald-100 bg-white p-4 shadow-sm md:grid-cols-[1.35fr_1fr] md:p-6">
          <div className="relative min-h-75 overflow-hidden rounded-2xl bg-linear-to-br from-emerald-100 via-[#f4f6ea] to-emerald-50 md:min-h-90">
            <div className="absolute inset-0 opacity-60">
              <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,rgba(5,150,105,0.18)_1px,transparent_0)] bg-size-[26px_26px]" />
            </div>

            <div className="absolute left-1/4 top-1/3 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700 shadow">
              <MapPin size={14} />
              Showroom
            </div>
            <div className="absolute left-2/3 top-1/2 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700 shadow">
              <MapPin size={14} />
              Kho hàng
            </div>
            <div className="absolute left-1/2 top-3/4 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700 shadow">
              <MapPin size={14} />
              Vườn ươm
            </div>

            <div className="absolute bottom-3 right-3 rounded-xl bg-white/95 px-3 py-2 text-xs text-gray-600 shadow">
              Map preview placeholder
            </div>
          </div>

          <div className="rounded-2xl bg-[#f9faf7] p-5 md:p-6">
            <h3 className="text-xl font-semibold text-gray-900">Thông tin ghé thăm</h3>
            <div className="mt-4 space-y-4 text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <Building2 size={18} />
                </span>
                <div>
                  <p className="font-semibold text-gray-900">Showroom chính</p>
                  <p>12 Nguyễn Văn Bảo, Hạnh Thông, Hồ Chí Minh</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <Clock3 size={18} />
                </span>
                <div>
                  <p className="font-semibold text-gray-900">Khung giờ tiếp đón</p>
                  <p>08:00 - 20:00 tất cả các ngày trong tuần</p>
                </div>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=12+Nguyen+Van+Bao+Hanh+Thong+Ho+Chi+Minh"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              <Navigation size={16} />
              Mở bản đồ chỉ đường
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SupportLocationSection;
