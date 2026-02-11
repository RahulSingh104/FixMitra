import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import API from "@/api/api"

export default function ManageUsers() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    API.get("/admin/users").then((res) => {
      setUsers(res.data)
    })
  }, [])

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-4">
      <h2 className="text-xl font-semibold">
        Manage Users
      </h2>

      {users.map((user) => (
        <Card key={user.id}>
          <CardContent className="p-4 flex justify-between">
            <span>{user.email}</span>
            <span className="text-gray-500">
              {user.role}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
