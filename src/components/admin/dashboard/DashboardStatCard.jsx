function DashboardStatCard({ label, value, description, accent = 'emerald' }) {
  const accentClasses = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    sky: 'bg-sky-50 text-sky-700 border-sky-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
  }

  return (
    <article className={`rounded-2xl border p-5 shadow-sm ${accentClasses[accent]}`}>
      <p className="text-sm font-medium opacity-80">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
      {description ? <p className="mt-2 text-sm opacity-80">{description}</p> : null}
    </article>
  )
}

export default DashboardStatCard
