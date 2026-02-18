import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "@/context/auth-context"

export default function ProtectedRoute({ children, allowedRoles }) {

  const { user, activeRole } = useContext(AuthContext)

  const token = activeRole
    ? localStorage.getItem(`token_${activeRole}`)
    : null

  if (!token || !user) {
    return <Navigate to="/login" />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />
  }

  return children
}
