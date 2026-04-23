import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpenText,
  CircleHelp,
  PackageSearch,
  RefreshCw,
  Truck,
} from "lucide-react";
import { quickActions } from "../supportData";

const iconByAction = {
  "track-order": PackageSearch,
  "shipping-policy": Truck,
  "return-policy": RefreshCw,
  "care-manual": BookOpenText,
  consultation: CircleHelp,
};

function SupportQuickActions() {
  return (
    <section className="bg-[#f7f8f3] py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-10">
          <h2 className="text-3xl font-bold text-emerald-900 md:text-4xl">
            Hỗ trợ nhanh
          </h2>
          <p className="mt-3 max-w-3xl text-gray-600">
            Chọn nhu cầu thường dùng để đi đến đúng nơi chỉ trong một chạm.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {quickActions.map((item) => {
            const Icon = iconByAction[item.id] || CircleHelp;
            const isAnchor = item.to.startsWith("#");
            const className =
              "group flex h-full flex-col rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md";

            const content = (
              <>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-100">
                  <Icon size={20} />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {item.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                  Xem chi tiết
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </>
            );

            if (isAnchor) {
              return (
                <a key={item.id} href={item.to} className={className}>
                  {content}
                </a>
              );
            }

            return (
              <Link key={item.id} to={item.to} className={className}>
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SupportQuickActions;
