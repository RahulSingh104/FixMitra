import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function BookingChart({ data }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h3 className="font-semibold mb-6 text-lg">
        Booking Overview
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#6366F1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
