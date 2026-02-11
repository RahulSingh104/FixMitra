import { Link } from "react-router-dom"
import useUser from "@/hooks/useUser"

export default function Sidebar() {
  const user = useUser()

  if (!user) return null

  return (
    <div className="w-64 bg-white border-r p-6 space-y-4">
      <h2 className="text-lg font-semibold">Dashboard</h2>

      {user.role === "USER" && (
        <>
          <Link to="/services">Browse Services</Link>
          <Link to="/bookings">My Bookings</Link>
        </>
      )}

      {user.role === "PROVIDER" && (
        <>
          <Link to="/provider/services">My Services</Link>
          <Link to="/provider/bookings">Service Requests</Link>
        </>
      )}

      {user.role === "ADMIN" && (
        <>
          <Link to="/admin/categories">Manage Categories</Link>
          <Link to="/admin/users">Manage Users</Link>
        </>
      )}
    </div>
  )
}
