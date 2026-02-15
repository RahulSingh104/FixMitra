
// import { Navigate } from "react-router-dom"
// import useUser from "@/hooks/useUser"

// export default function ProtectedRoute({ children, allowedRoles }) {
//   const token = localStorage.getItem("token")
//   const user = useUser()

//   // Not logged in
//   if (!token || !user) {
//     return <Navigate to="/login" replace />
//   }

//   // Role restriction
//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/" replace />
//   }

//   return children
// }


import { Navigate } from "react-router-dom"
import useUser from "@/hooks/useUser"

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token")
  const user = useUser()

  if (!token || !user) {
    return <Navigate to="/login" />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />
  }
  
  console.log("ProtectedRoute check:", user?.role)

  return children
}
