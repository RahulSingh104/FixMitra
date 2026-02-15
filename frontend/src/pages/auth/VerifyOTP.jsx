import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import API from "@/api/api"
import useAuth from "@/hooks/useAuth"

export default function VerifyOTP() {
  const navigate = useNavigate()
  const location = useLocation()

  const email = location.state?.email
  const [otp, setOtp] = useState("")
  const { login } = useAuth()

  // const handleVerify = async (e) => {
  //   e.preventDefault()

  //   const res = await API.post("/auth/verify-otp", {
  //     email,
  //     otp,
  //   })

  //   localStorage.setItem("token", res.data.token)

  //   navigate("/services")
  // }

  const handleVerify = async (e) => {
  e.preventDefault()

  try {
    const res = await API.post("/auth/verify-otp", {
      email,
      otp,
    })

    login(res.data.user, res.data.token)

    navigate("/")
  } catch (error) {
    console.log(error.response?.data)
  }
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px] shadow-lg">
        <CardHeader>
          <CardTitle>Verify OTP</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <Label>Enter OTP</Label>
              <Input
                placeholder="123456"
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <Button className="w-full">Verify</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
