function AdminSectionPage({ title, description }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      <p className="mt-3 max-w-2xl text-slate-600">
        {description || 'This section is ready for your business logic and API integration.'}
      </p>
    </section>
  )
}

export default AdminSectionPage
