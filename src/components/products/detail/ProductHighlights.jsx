function ProductHighlights({ specs }) {
  return (
    <div className="rounded-[32px] border border-[#e4eadf] bg-white p-6 shadow-[0_18px_60px_rgba(20,45,30,0.08)]">
      <h2 className="text-xl font-bold text-[#163020]">Thông tin nổi bật</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {specs.slice(0, 8).map((item) => (
          <div key={item.label} className="rounded-2xl border border-[#eef2eb] bg-[#fcfdfb] p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[#7a867b]">{item.label}</p>
            <p className="mt-2 font-semibold text-[#223423]">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductHighlights;
