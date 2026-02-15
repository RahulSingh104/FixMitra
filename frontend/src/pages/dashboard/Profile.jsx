import { useState } from "react"
import useUser from "@/hooks/useUser"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import API from "@/api/api"

export default function Profile() {
  const { user } = useUser()
  const [name, setName] = useState(user?.name || "")

  const updateProfile = async () => {
    await API.put("/auth/profile", { name })
    alert("Profile updated")
  }

  return (
    <div className="max-w-xl mx-auto p-10">
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">My Profile</h2>

          <input
            className="border p-2 rounded w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Button onClick={updateProfile}>
            Update
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
