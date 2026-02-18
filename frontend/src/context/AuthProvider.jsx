// import { useState } from "react"
// import { AuthContext } from "./authContext"

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     const storedUser = localStorage.getItem("user")
//     return storedUser ? JSON.parse(storedUser) : null
//   })

//   const login = (userData, token) => {
//     localStorage.setItem("user", JSON.stringify(userData))
//     localStorage.setItem("token", token)
//     setUser(userData)
//   }

//   const logout = () => {
//     localStorage.removeItem("user")
//     localStorage.removeItem("token")
//     setUser(null)
//   }

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

import { useState, useMemo } from "react"
import { AuthContext } from "./auth-context"

export function AuthProvider({ children }) {

  // ✅ Only one source of truth
  const [activeRole, setActiveRole] = useState(
    localStorage.getItem("activeRole")
  )

  // ✅ Derive user from activeRole (NO useEffect needed)
  const user = useMemo(() => {
    if (!activeRole) return null
    const storedUser = localStorage.getItem(`user_${activeRole}`)
    return storedUser ? JSON.parse(storedUser) : null
  }, [activeRole])

  // ✅ LOGIN
  const login = (userData, token) => {
    const role = userData.role

    localStorage.setItem(`user_${role}`, JSON.stringify(userData))
    localStorage.setItem(`token_${role}`, token)
    localStorage.setItem("activeRole", role)

    setActiveRole(role)
  }

  // ✅ SWITCH ROLE
  const switchRole = (role) => {
    localStorage.setItem("activeRole", role)
    setActiveRole(role)
  }

  // ✅ LOGOUT ONLY CURRENT ROLE
  const logout = () => {
    if (!activeRole) return

    localStorage.removeItem(`user_${activeRole}`)
    localStorage.removeItem(`token_${activeRole}`)
    localStorage.removeItem("activeRole")

    setActiveRole(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        switchRole,
        activeRole
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
