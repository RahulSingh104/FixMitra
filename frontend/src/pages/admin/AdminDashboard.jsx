import { useEffect, useState } from "react"
import API from "@/api/api"
import BookingChart from "@/components/charts/BookingChart";


export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    providers: 0,
    services: 0,
    bookings: 0,
    pending: 0,
    accepted: 0,
    completed: 0
  })

  useEffect(() => {
    API.get("/admin/stats").then((res) => {
      setStats(res.data)
    })
  }, [])

  // Static fallback (can replace with real API values later)
  const chartData = [
    { name: "Pending", value: stats.pending || 5 },
    { name: "Accepted", value: stats.accepted || 8 },
    { name: "Completed", value: stats.completed || 12 },
  ]

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">

      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>

      {/* ===== STATS GRID ===== */}
      <div className="grid md:grid-cols-4 gap-6">

        <StatCard title="Total Users" value={stats.users} type="indigo" />
        <StatCard title="Providers" value={stats.providers} type="blue" />
        <StatCard title="Services" value={stats.services} type="purple" />
        <StatCard title="Bookings" value={stats.bookings} type="green" />

      </div>

      {/* ===== BOOKING STATUS CHART ===== */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
          Booking Status Overview
        </h2>

        <BookingChart data={chartData} />
      </div>

    </div>
  )
}

/* ================= COMPONENT ================= */

function StatCard({ title, value, type = "indigo" }) {

  const colorMap = {
    indigo: "bg-indigo-50 text-indigo-600",
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    green: "bg-green-50 text-green-600",
  }

  return (
    <div className={`rounded-2xl p-6 shadow-sm ${colorMap[type]}`}>
      <h3 className="text-sm">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  )
}
