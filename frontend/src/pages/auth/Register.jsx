import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import API from "@/api/api"

export default function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })

//   const handleSubmit = async (e) => {
//   e.preventDefault()

//   if(loading) return 

//   setLoading(true)

//   try {
//     const res = await API.post("/auth/register", form)

//     // ✅ IMPORTANT: use backend email (safe)
//     navigate("/verify", {
//       state: { email: res.data.email }
//     })

//   } catch (error) {
//     console.log("REGISTER ERROR:", error.response?.data)
//     alert(error.response?.data?.message || "Registration failed")
//   } finally {
//     setLoading(false)
//   }
// }

const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const res = await API.post("/auth/register", form)

    // 🔥 SHOW OTP IN ALERT
    alert(`Your OTP is: ${res.data.otp}`)

    navigate("/verify", {
      state: {
        email: res.data.email,
        otp: res.data.otp // optional
      }
    })

  } catch (error) {
    console.log("REGISTER ERROR:", error.response?.data)
    alert(error.response?.data?.message || "Registration failed")
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px] shadow-lg">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                placeholder="John Doe"
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="example@mail.com"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>

            <Button className="w-full" onClick={handleSubmit}>Register</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
