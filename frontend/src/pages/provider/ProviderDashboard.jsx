// import { useEffect, useState } from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import API from "@/api/api"

// export default function ProviderDashboard() {
//   const [stats, setStats] = useState({
//     services: 0,
//     bookings: 0,
//     earnings: 0,
//   })

//   const [recentBookings, setRecentBookings] = useState([])

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const servicesRes = await API.get("/services/provider")
//         const bookingsRes = await API.get("/bookings/provider")

//         const totalEarnings = bookingsRes.data
//           .filter((b) => b.status === "COMPLETED")
//           .reduce((acc, curr) => acc + curr.service.price, 0)

//         setStats({
//           services: servicesRes.data.length,
//           bookings: bookingsRes.data.length,
//           earnings: totalEarnings,
//         })

//         setRecentBookings(bookingsRes.data.slice(0, 5))

//       } catch (err) {
//         console.error("Dashboard fetch error", err)
//       }
//     }

//     fetchDashboard()
//   }, [])

//   return (
//     <div className="p-8 space-y-10">

//       {/* STATS CARDS */}
//       <div className="grid md:grid-cols-3 gap-8">
//         <Card className="rounded-2xl shadow-lg">
//           <CardContent className="p-6">
//             <p className="text-gray-500">Total Services</p>
//             <h2 className="text-3xl font-bold">
//               {stats.services}
//             </h2>
//           </CardContent>
//         </Card>

//         <Card className="rounded-2xl shadow-lg">
//           <CardContent className="p-6">
//             <p className="text-gray-500">Total Bookings</p>
//             <h2 className="text-3xl font-bold">
//               {stats.bookings}
//             </h2>
//           </CardContent>
//         </Card>

//         <Card className="rounded-2xl shadow-lg">
//           <CardContent className="p-6">
//             <p className="text-gray-500">Total Earnings</p>
//             <h2 className="text-3xl font-bold text-indigo-600">
//               ₹{stats.earnings}
//             </h2>
//           </CardContent>
//         </Card>
//       </div>

//       {/* RECENT BOOKINGS */}
//       <div>
//         <h2 className="text-2xl font-bold mb-6">
//           Recent Bookings
//         </h2>

//         <div className="bg-white shadow rounded-2xl overflow-hidden">
//           <table className="w-full text-left">
//             <thead className="bg-muted">
//               <tr>
//                 <th className="p-4">Customer</th>
//                 <th className="p-4">Service</th>
//                 <th className="p-4">Date</th>
//                 <th className="p-4">Status</th>
//               </tr>
//             </thead>

//             <tbody>
//               {recentBookings.map((booking) => (
//                 <tr key={booking.id} className="border-t">
//                   <td className="p-4">
//                     {booking.user?.name}
//                   </td>

//                   <td className="p-4">
//                     {booking.service?.title}
//                   </td>

//                   <td className="p-4">
//                     {new Date(booking.scheduledAt).toLocaleDateString()}
//                   </td>

//                   <td className="p-4">
//                     <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                       booking.status === "PENDING"
//                         ? "bg-yellow-100 text-yellow-700"
//                         : booking.status === "ACCEPTED"
//                         ? "bg-blue-100 text-blue-700"
//                         : booking.status === "COMPLETED"
//                         ? "bg-green-100 text-green-700"
//                         : "bg-red-100 text-red-700"
//                     }`}>
//                       {booking.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//     </div>
//   )
// }




import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import API from "@/api/api"

export default function ProviderDashboard() {
  const [stats, setStats] = useState({
    services: 0,
    bookings: 0,
    earnings: 0,
    completed: 0,
  })

  const [recentBookings, setRecentBookings] = useState([])

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // 🔥 NEW FAST STATS API
        const statsRes = await API.get("/bookings/provider/stats")

        setStats({
          services: statsRes.data.totalServices,
          bookings: statsRes.data.totalBookings,
          earnings: statsRes.data.earnings,
          completed: statsRes.data.completedBookings,
        })

        // 🔥 ALSO FETCH BOOKINGS FOR TABLE
        const bookingsRes = await API.get("/bookings/provider")
        setRecentBookings(bookingsRes.data.slice(0, 5))

      } catch (err) {
        console.error("Fast stats failed, using fallback", err)

        // 🟡 FALLBACK TO OLD LOGIC
        try {
          const servicesRes = await API.get("/services/provider")
          const bookingsRes = await API.get("/bookings/provider")

          const totalEarnings = bookingsRes.data
            .filter((b) => b.status === "COMPLETED")
            .reduce((acc, curr) => acc + curr.service.price, 0)

          setStats({
            services: servicesRes.data.length,
            bookings: bookingsRes.data.length,
            earnings: totalEarnings,
            completed: bookingsRes.data.filter(
              (b) => b.status === "COMPLETED"
            ).length,
          })

          setRecentBookings(bookingsRes.data.slice(0, 5))

        } catch (fallbackErr) {
          console.error("Dashboard fetch error", fallbackErr)
        }
      }
    }

    fetchDashboard()
  }, [])

  return (
    <div className="p-8 space-y-10">

      {/* ===== STATS CARDS ===== */}
      <div className="grid md:grid-cols-4 gap-8">

        <StatCard title="Total Services" value={stats.services} />
        <StatCard title="Total Bookings" value={stats.bookings} />
        <StatCard title="Completed" value={stats.completed} />
        <StatCard title="Total Earnings" value={`₹${stats.earnings}`} highlight />

      </div>

      {/* ===== RECENT BOOKINGS ===== */}
      <div>
        <h2 className="text-2xl font-bold mb-6">
          Recent Bookings
        </h2>

        <div className="bg-white shadow rounded-2xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-muted">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Service</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="border-t">
                  <td className="p-4">
                    {booking.user?.name}
                  </td>

                  <td className="p-4">
                    {booking.service?.title}
                  </td>

                  <td className="p-4">
                    {new Date(booking.scheduledAt).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : booking.status === "ACCEPTED"
                          ? "bg-blue-100 text-blue-700"
                          : booking.status === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  )
}

/* ===== REUSABLE STAT CARD ===== */

function StatCard({ title, value, highlight }) {
  return (
    <Card className={`rounded-2xl shadow-lg ${highlight ? "border-2 border-indigo-500" : ""}`}>
      <CardContent className="p-6">
        <p className="text-gray-500">{title}</p>
        <h2 className="text-3xl font-bold text-indigo-600">
          {value}
        </h2>
      </CardContent>
    </Card>
  )
}
