import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import API from "@/api/api"


const MotionDiv = motion.div;

export default function ProviderBookings() {
  const [bookings, setBookings] = useState([])
  const [loadingId, setLoadingId] = useState(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    const res = await API.get("/bookings/my")
    setBookings(res.data)
  }

  const updateStatus = async (id, status) => {
    try {
      setLoadingId(id)

      await API.put(`/bookings/${id}/status`, { status })

      // Live UI Update
      setBookings((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, status } : b
        )
      )

      toast({
        title: "Success",
        description: `Booking ${status.toLowerCase()} successfully`,
      })
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setLoadingId(null)
    }
  }

  const pending = bookings.filter(b => b.status === "PENDING").length
  const accepted = bookings.filter(b => b.status === "ACCEPTED").length
  const completed = bookings.filter(b => b.status === "COMPLETED").length

  return (
    <div className="max-w-6xl mx-auto p-10 space-y-10">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold">Provider Bookings</h1>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard title="Pending" value={pending} type="PENDING" />
        <StatCard title="Accepted" value={accepted} type="ACCEPTED" />
        <StatCard title="Completed" value={completed} type="COMPLETED" />
      </div>

      {/* BOOKINGS */}
      <div className="space-y-6">
        {bookings.map((booking) => (
          <MotionDiv
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="rounded-2xl shadow-sm hover:shadow-lg transition">
              <CardContent className="p-6 flex justify-between items-center">

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">
                    {booking.service.title}
                  </h3>

                  <StatusBadge status={booking.status} />
                </div>

                {booking.status === "PENDING" && (
                  <div className="flex gap-2">

                    {/* ACCEPT */}
                    <Button
                      disabled={loadingId === booking.id}
                      onClick={() =>
                        updateStatus(booking.id, "ACCEPTED")
                      }
                    >
                      {loadingId === booking.id
                        ? "Processing..."
                        : "Accept"}
                    </Button>

                    {/* REJECT WITH CONFIRM */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          disabled={loadingId === booking.id}
                        >
                          Reject
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action will reject the booking.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              updateStatus(
                                booking.id,
                                "REJECTED"
                              )
                            }
                          >
                            Yes, Reject
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                  </div>
                )}

              </CardContent>
            </Card>
          </MotionDiv>
        ))}
      </div>

    </div>
  )
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value, type }) {

  const colorMap = {
    PENDING: "bg-yellow-50 text-yellow-600",
    ACCEPTED: "bg-blue-50 text-blue-600",
    COMPLETED: "bg-green-50 text-green-600",
  }

  return (
    <div className={`rounded-2xl p-6 shadow-sm ${colorMap[type]}`}>
      <h3 className="text-sm">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  )
}

function StatusBadge({ status }) {

  const statusMap = {
    PENDING: "bg-yellow-100 text-yellow-700",
    ACCEPTED: "bg-blue-100 text-blue-700",
    COMPLETED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
  }

  return (
    <Badge className={statusMap[status]}>
      {status}
    </Badge>
  )
}
