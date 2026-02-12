import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import API from "@/api/api"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom";

const MotionDiv = motion.div;

export default function BookingModal({ serviceId }) {
  const [open, setOpen] = useState(false)
  const [address, setAddress] = useState("")
  const [date, setDate] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleBooking = async () => {
    try {
      setLoading(true)

      const res = await API.post("/bookings", {
  serviceId,
  address,
  scheduledAt: date,
})

navigate(`/payment/${res.data.id}`)


      setSuccess(true)
      setTimeout(() => {
        setOpen(false)
        setSuccess(false)
      }, 2000)

    } catch (err) {
      console.error("Booking failed", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Book Now
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-2xl">

          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                Book This Service
              </DialogTitle>
            </DialogHeader>

            {success ? (
              <div className="text-center py-10">
                <p className="text-green-600 font-semibold">
                  Booking Successful 🎉
                </p>
              </div>
            ) : (
              <div className="space-y-6 mt-6">

                <div>
                  <label className="text-sm font-medium">
                    Address
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-4 py-2 mt-2"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter service address"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Select Date
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full border rounded-lg px-4 py-2 mt-2"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <Button
                  className="w-full"
                  disabled={loading}
                  onClick={handleBooking}
                >
                  {loading ? "Processing..." : "Confirm Booking"}
                </Button>

              </div>
            )}
          </MotionDiv>

        </DialogContent>
      </Dialog>
    </>
  )
}
