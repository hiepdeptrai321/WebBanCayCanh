import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { contactChannels } from "../supportData";

const iconByType = {
  phone: Phone,
  email: Mail,
  address: MapPin,
  hours: Clock3,
};

function SupportContactSection() {
  return (
    <section className="bg-[#f7f8f3] py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-10">
          <h2 className="text-3xl font-bold text-emerald-900 md:text-4xl">
            Thông tin liên hệ
          </h2>
          <p className="mt-3 max-w-3xl text-gray-600">
            Kết nối với đội ngũ hỗ trợ qua hotline, email hoặc đến trực tiếp văn
            phòng để được tư vấn đầy đủ.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {contactChannels.map((item) => {
            const Icon = iconByType[item.id] || Phone;
            const isExternal = item.href.startsWith("http");

            return (
              <article
                key={item.id}
                className="group flex h-full flex-col rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Icon size={20} />
                </span>

                <p className="mt-4 text-sm font-medium text-emerald-700">
                  {item.title}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-gray-900">
                  {item.value}
                </h3>
                <p className="mt-2 text-sm text-gray-500">{item.hint}</p>

                <a
                  href={item.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 transition-colors group-hover:text-emerald-800"
                >
                  {item.actionLabel}
                  <ArrowUpRight size={16} />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SupportContactSection;
