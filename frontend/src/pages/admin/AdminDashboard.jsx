import { useEffect, useState } from "react"
import API from "@/api/api"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    providers: 0,
    services: 0,
    bookings: 0
  })

  useEffect(() => {
    API.get("/admin/stats").then((res) => {
      setStats(res.data)
    })
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">

      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6">

        <StatCard title="Total Users" value={stats.users} />
        <StatCard title="Providers" value={stats.providers} color="blue" />
        <StatCard title="Services" value={stats.services} color="purple" />
        <StatCard title="Bookings" value={stats.bookings} color="green" />

      </div>

    </div>
  )
}

function StatCard({ title, value, color = "indigo" }) {
  return (
    <div className={`rounded-2xl p-6 shadow-sm bg-${color}-50`}>
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className={`text-3xl font-bold text-${color}-600`}>
        {value}
      </p>
    </div>
  )
}
