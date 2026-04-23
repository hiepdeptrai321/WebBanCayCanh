import { Clock3, ShieldCheck, Sprout } from "lucide-react";
import BrandLeafIcon from "../../../components/common/BrandLeafIcon";

const highlights = [
  {
    id: "fast-response",
    icon: Clock3,
    title: "Phản hồi nhanh",
    description: "Tư vấn trong 15-30 phút trong giờ làm việc",
  },
  {
    id: "trusted-service",
    icon: ShieldCheck,
    title: "Cam kết minh bạch",
    description: "Chính sách rõ ràng, hỗ trợ sau mua đầy đủ",
  },
  {
    id: "plant-experts",
    icon: Sprout,
    title: "Đội ngũ chuyên môn",
    description: "Hỗ trợ từ đặt hàng đến chăm sóc cây tại nhà",
  },
];

function SupportHero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-emerald-900 via-emerald-700 to-emerald-600 py-20 md:py-24">
      <div className="absolute -left-14 top-8 h-56 w-56 rounded-full bg-white/15 blur-3xl" />
      <div className="absolute -right-10 bottom-6 h-64 w-64 rounded-full bg-amber-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center text-white">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-1 text-sm tracking-wide">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
              <BrandLeafIcon size={12} className="text-white" />
            </span>
            Chăm sóc khách hàng tận tâm
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
            Trung tâm hỗ trợ
          </h1>
          <p className="mt-5 text-base text-emerald-50 md:text-xl">
            Giải đáp nhanh mọi thắc mắc về sản phẩm, đơn hàng, vận chuyển,
            chính sách đổi trả và chăm sóc cây sau khi mua.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.id}
                className="rounded-2xl border border-white/25 bg-white/10 p-5 text-white backdrop-blur-sm"
              >
                <div className="mb-4 inline-flex rounded-xl bg-white/15 p-2">
                  <Icon size={20} />
                </div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm text-emerald-50">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SupportHero;
