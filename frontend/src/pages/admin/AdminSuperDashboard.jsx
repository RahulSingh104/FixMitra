/* eslint-disable react-hooks/set-state-in-effect */
// import { useEffect, useState } from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import API from "@/api/api"
// import AdminChart from "@/components/charts/AdminChart"



// export default function AdminSuperDashboard() {
//   const [stats, setStats] = useState(null)

//   const dummyData = [
//   { month: "Jan", bookings: 12 },
//   { month: "Feb", bookings: 18 },
//   { month: "Mar", bookings: 9 },
//   { month: "Apr", bookings: 22 },
// ]

// <AdminChart data={dummyData} />

//   useEffect(() => {
//     API.get("/admin/stats").then((res) => {
//       setStats(res.data)
//     })
//   }, [])

//   if (!stats) return null

//   return (
//     <div className="p-10 grid md:grid-cols-4 gap-8">
//       <Card className="rounded-2xl shadow-lg">
//         <CardContent className="p-6">
//           <p className="text-gray-500">Total Users</p>
//           <h2 className="text-3xl font-bold">{stats.users}</h2>
//         </CardContent>
//       </Card>

//       <Card className="rounded-2xl shadow-lg">
//         <CardContent className="p-6">
//           <p className="text-gray-500">Total Services</p>
//           <h2 className="text-3xl font-bold">{stats.services}</h2>
//         </CardContent>
//       </Card>

//       <Card className="rounded-2xl shadow-lg">
//         <CardContent className="p-6">
//           <p className="text-gray-500">Total Bookings</p>
//           <h2 className="text-3xl font-bold">{stats.bookings}</h2>
//         </CardContent>
//       </Card>

//       <Card className="rounded-2xl shadow-lg">
//         <CardContent className="p-6">
//           <p className="text-gray-500">Revenue</p>
//           <h2 className="text-3xl font-bold text-green-600">
//             ₹{stats.revenue}
//           </h2>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }


import { useEffect, useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import API from "@/api/api"
import AdminChart from "@/components/charts/AdminChart"
import BookingPieChart from "@/components/charts/BookingPieChart"
import CountUp from "react-countup"
import { TrendingUp, TrendingDown } from "lucide-react"
import { io } from "socket.io-client"

const socket = io("http://localhost:5000")

export default function AdminSuperDashboard() {
  const [stats, setStats] = useState(null)
  const [growth, setGrowth] = useState(0)

  // ✅ Declare functions FIRST using useCallback

  const calculateGrowth = useCallback((data) => {
    if (!data?.lastMonthRevenue) return

    const percent =
      ((data.revenue - data.lastMonthRevenue) /
        data.lastMonthRevenue) *
      100

    setGrowth(percent.toFixed(1))
  }, [])

  const fetchStats = useCallback(async () => {
    try {
      const res = await API.get("/admin/stats")
      setStats(res.data)
      calculateGrowth(res.data)
    } catch (err) {
      console.error("Error fetching stats:", err)
    }
  }, [calculateGrowth])

  // ✅ Now useEffect AFTER function declaration

  useEffect(() => {
    fetchStats()

    socket.on("adminStatsUpdated", (data) => {
      setStats(data)
      calculateGrowth(data)
    })

    return () => {
      socket.off("adminStatsUpdated")
    }
  }, [fetchStats, calculateGrowth])

  if (!stats) return null

  const bookingStatusData = [
    { name: "Pending", value: stats.pending || 0 },
    { name: "Accepted", value: stats.accepted || 0 },
    { name: "Rejected", value: stats.rejected || 0 },
  ]

  return (
    <div className="p-10 space-y-10">

      {/* STAT CARDS */}
      <div className="grid md:grid-cols-4 gap-8">

        <DashboardCard title="Total Users" value={stats.users} />
        <DashboardCard title="Total Services" value={stats.services} />
        <DashboardCard title="Total Bookings" value={stats.bookings} />

        <Card className="rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <p className="text-gray-500">Revenue</p>
            <h2 className="text-3xl font-bold text-green-600">
              ₹<CountUp end={stats.revenue} duration={2} />
            </h2>

            <div className="flex items-center mt-2 text-sm">
              {growth >= 0 ? (
                <>
                  <TrendingUp className="text-green-500 mr-1" size={16} />
                  <span className="text-green-600">
                    {growth}% growth
                  </span>
                </>
              ) : (
                <>
                  <TrendingDown className="text-red-500 mr-1" size={16} />
                  <span className="text-red-600">
                    {growth}% decline
                  </span>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Chart */}
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">
            Monthly Bookings
          </h3>
          <AdminChart data={stats.monthlyBookings || []} />
        </CardContent>
      </Card>

      {/* Pie Chart */}
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">
            Booking Status Overview
          </h3>
          <BookingPieChart data={bookingStatusData} />
        </CardContent>
      </Card>

    </div>
  )
}

function DashboardCard({ title, value }) {
  return (
    <Card className="rounded-2xl shadow-lg">
      <CardContent className="p-6">
        <p className="text-gray-500">{title}</p>
        <h2 className="text-3xl font-bold">
          <CountUp end={value} duration={2} />
        </h2>
      </CardContent>
    </Card>
  )
}
