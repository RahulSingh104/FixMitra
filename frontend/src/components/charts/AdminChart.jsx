// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts"

// export default function AdminChart({ data }) {
//   return (
//     <div className="bg-white p-6 rounded-2xl shadow">
//       <h2 className="text-xl font-bold mb-4">
//         Monthly Bookings
//       </h2>

//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={data}>
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />
//           <Bar dataKey="bookings" fill="#6366f1" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   )
// }



import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function AdminChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="bookings"
          stroke="#6366f1"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
