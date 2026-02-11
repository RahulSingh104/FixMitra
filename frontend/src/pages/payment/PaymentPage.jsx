import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router-dom"
import API from "@/api/api"

export default function PaymentPage() {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    try {
      setLoading(true)

      // Simulated Razorpay-ready endpoint
      await API.post(`/payments/${bookingId}/simulate-success`)

      navigate("/dashboard/bookings")

    } catch (err) {
      console.error("Payment failed", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-10">
      <Card className="rounded-2xl shadow-xl">
        <CardContent className="p-8 space-y-6 text-center">

          <h1 className="text-3xl font-bold">
            Secure Payment
          </h1>

          <p className="text-gray-600">
            Razorpay integration ready. Currently running in demo mode.
          </p>

          <Button
            className="w-full"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </Button>

        </CardContent>
      </Card>
    </div>
  )
}
