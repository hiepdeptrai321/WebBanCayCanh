import { useState } from "react";
import { ChevronDown, CircleHelp } from "lucide-react";
import { faqItems } from "../supportData";

function SupportFaqSection() {
  const [activeId, setActiveId] = useState(faqItems[0].id);

  return (
    <section id="faq-section" className="bg-white py-14 md:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.05fr_1.35fr] lg:gap-10 lg:px-8">
        <div className="rounded-3xl bg-linear-to-br from-emerald-700 to-emerald-600 p-8 text-white shadow-xl">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
            <CircleHelp size={24} />
          </span>
          <h2 className="mt-5 text-3xl font-bold md:text-4xl">Câu hỏi thường gặp</h2>
          <p className="mt-4 text-emerald-50">
            Chọn nhanh câu hỏi bạn quan tâm. Nếu chưa thấy nội dung phù hợp,
            hãy gửi yêu cầu để đội ngũ hỗ trợ trực tiếp.
          </p>
          <a
            href="#support-form"
            className="mt-6 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            Gửi yêu cầu ngay
          </a>
        </div>

        <div className="space-y-3">
          {faqItems.map((item) => {
            const isOpen = activeId === item.id;

            return (
              <article
                key={item.id}
                className="overflow-hidden rounded-2xl border border-emerald-100 bg-[#fcfdf9]"
              >
                <button
                  type="button"
                  onClick={() => setActiveId(isOpen ? null : item.id)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                >
                  <span className="text-base font-semibold text-gray-900 md:text-lg">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-emerald-700 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  id={`faq-panel-${item.id}`}
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-emerald-100 px-5 py-4 text-sm leading-relaxed text-gray-600 md:px-6 md:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SupportFaqSection;
