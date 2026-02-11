import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import API from "@/api/api"

export default function MyBookings() {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    API.get("/bookings/my").then((res) => {
      setBookings(res.data)
    })
  }, [])

  const handlePayment = async (bookingId) => {
    const order = await API.post("/payments/create-order", {
      bookingId,
    })

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: order.data.amount,
      currency: order.data.currency,
      order_id: order.data.id,
      handler: async function (response) {
        await API.post("/payments/verify", {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        })

        alert("Payment Successful")
      },
      theme: {
        color: "#2563eb",
      },
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  return (
    <div className="max-w-6xl mx-auto p-10 space-y-6">
      <h1 className="text-2xl font-bold">My Bookings</h1>

      {bookings.map((booking) => (
        <Card key={booking.id} className="rounded-2xl">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">
                {booking.service.title}
              </h3>
              <p className="text-gray-500">
                {booking.status}
              </p>
            </div>

            {booking.payment?.status !== "SUCCESS" && (
              <Button onClick={() => handlePayment(booking.id)}>
                Pay Now
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
