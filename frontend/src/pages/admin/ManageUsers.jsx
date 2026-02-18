// import { useEffect, useState } from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import API from "@/api/api"

// export default function ManageUsers() {
//   const [users, setUsers] = useState([])

//   useEffect(() => {
//     API.get("/admin/users").then((res) => {
//       setUsers(res.data)
//     })
//   }, [])

//   return (
//     <div className="max-w-5xl mx-auto p-8 space-y-4">
//       <h2 className="text-xl font-semibold">
//         Manage Users
//       </h2>

//       {users.map((user) => (
//         <Card key={user.id}>
//           <CardContent className="p-4 flex justify-between">
//             <span>{user.email}</span>
//             <span className="text-gray-500">
//               {user.role}
//             </span>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   )
// }


import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import API from "@/api/api"

export default function ManageUsers() {
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users")
      setUsers(res.data)
    } catch (err) {
      console.error("User fetch failed", err)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleBlockToggle = async (userId, isBlocked) => {
    try {
      if (isBlocked) {
        await API.patch(`/admin/unblock/${userId}`)
      } else {
        await API.patch(`/admin/block/${userId}`)
      }

      fetchUsers() // 🔥 refresh list after update
    } catch (err) {
      console.error("Block action failed", err)
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-4">
      <h2 className="text-xl font-semibold">
        Manage Users
      </h2>

      {users.map((user) => (
        <Card key={user._id}>
          <CardContent className="p-4 flex justify-between items-center">

            <div>
              <p className="font-medium">{user.email}</p>
              <p className="text-sm text-gray-500">{user.role}</p>
            </div>

            <Button
              variant={user.isBlocked ? "outline" : "destructive"}
              onClick={() =>
                handleBlockToggle(user._id, user.isBlocked)
              }
            >
              {user.isBlocked ? "Unblock" : "Block"}
            </Button>

          </CardContent>
        </Card>
      ))}
    </div>
  )
}
