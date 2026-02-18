import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "@/api/api"
import BookingChart from "@/components/charts/BookingChart"
import CountUp from "react-countup"
import { TrendingUp, TrendingDown } from "lucide-react"

export default function AdminDashboard() {
  const navigate = useNavigate()

  const [stats, setStats] = useState({
    users: 0,
    providers: 0,
    services: 0,
    bookings: 0,
    pending: 0,
    accepted: 0,
    completed: 0,
    revenue: 0,
    lastMonthRevenue: 0,
    activeUsers: 0,
    onlineProviders: 0,
    reports: 0,
    topProviders: []
  })

  const [growth, setGrowth] = useState(0)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/admin/stats")
        setStats(res.data)

        if (res.data.lastMonthRevenue > 0) {
          const percent =
            ((res.data.revenue - res.data.lastMonthRevenue) /
              res.data.lastMonthRevenue) * 100

          setGrowth(percent.toFixed(1))
        }
      } catch (err) {
        console.error("Admin stats fetch failed", err)
      }
    }

    fetchStats()
  }, [])

  const chartData = [
    { name: "Pending", value: stats.pending || 0 },
    { name: "Accepted", value: stats.accepted || 0 },
    { name: "Completed", value: stats.completed || 0 },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">

      {/* HEADER */}
      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>

      {/* ================= STATS GRID ================= */}
      <div className="grid md:grid-cols-5 gap-6">

        <StatCard title="Total Users" value={stats.users} type="indigo" />
        <StatCard title="Providers" value={stats.providers} type="blue" />
        <StatCard title="Services" value={stats.services} type="purple" />
        <StatCard title="Bookings" value={stats.bookings} type="green" />

        {/* Revenue Card */}
        <div className="rounded-2xl p-6 shadow-sm bg-green-50 text-green-600">
          <h3 className="text-sm">Revenue</h3>
          <p className="text-3xl font-bold">
            ₹<CountUp end={stats.revenue || 0} duration={2} />
          </p>

          <div className="flex items-center mt-2 text-sm">
            {growth >= 0 ? (
              <>
                <TrendingUp size={16} className="mr-1" />
                {growth}% growth
              </>
            ) : (
              <>
                <TrendingDown size={16} className="mr-1" />
                {growth}% decline
              </>
            )}
          </div>
        </div>

      </div>

      {/* ================= BOOKING STATUS CHART ================= */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
          Booking Status Overview
        </h2>

        <BookingChart data={chartData} />
      </div>

      {/* ================= QUICK ADMIN ACTIONS ================= */}
      <div className="grid md:grid-cols-3 gap-6">

        <button
          onClick={() => navigate("/admin/users")}
          className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
        >
          Manage Users
        </button>

        <button
          onClick={() => navigate("/admin/categories")}
          className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
        >
          Manage Categories
        </button>

        <button
          onClick={() => navigate("/admin/reports")}
          className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
        >
          Provider Reports
        </button>

      </div>

      {/* ================= LIVE MONITORING ================= */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Live Monitoring
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <StatCard title="Active Users" value={stats.activeUsers} type="blue" />
          <StatCard title="Online Providers" value={stats.onlineProviders} type="indigo" />
          <StatCard title="Pending Reports" value={stats.reports} type="purple" />
        </div>
      </div>

      {/* ================= PROVIDER PERFORMANCE ================= */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
          Provider Performance
        </h2>

        {stats.topProviders?.length === 0 ? (
          <p className="text-gray-500">No provider data available</p>
        ) : (
          stats.topProviders.map((provider) => (
            <div
              key={provider._id}
              className="flex justify-between border-b py-3"
            >
              <span>{provider.name}</span>
              <span>⭐ {provider.averageRating || 0}</span>
            </div>
          ))
        )}
      </div>

    </div>
  )
}

/* ================= REUSABLE STAT CARD ================= */

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
      <p className="text-3xl font-bold">
        <CountUp end={value || 0} duration={2} />
      </p>
    </div>
  )
}
