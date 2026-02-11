// import { useEffect, useState } from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import API from "@/api/api"

// export default function ProviderBookings() {
//   const [bookings, setBookings] = useState([])

//   useEffect(() => {
//     API.get("/bookings/my").then((res) => {
//       setBookings(res.data)
//     })
//   }, [])

//   const updateStatus = async (id, status) => {
//     await API.patch(`/bookings/${id}/status`, { status })
//     window.location.reload()
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-10 space-y-6">
//       {bookings.map((booking) => (
//         <Card key={booking.id}>
//           <CardContent className="p-6 flex justify-between">
//             <div>
//               <h3 className="font-semibold">
//                 {booking.service.title}
//               </h3>
//               <p>{booking.status}</p>
//             </div>

//             {booking.status === "PENDING" && (
//               <div className="flex gap-2">
//                 <Button
//                   onClick={() =>
//                     updateStatus(booking.id, "ACCEPTED")
//                   }
//                 >
//                   Accept
//                 </Button>
//                 <Button
//                   variant="destructive"
//                   onClick={() =>
//                     updateStatus(booking.id, "REJECTED")
//                   }
//                 >
//                   Reject
//                 </Button>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   )
// }



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
import API from "@/api/api"

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

      {/* ===== PAGE TITLE ===== */}
      <h1 className="text-3xl font-bold">Provider Bookings</h1>

      {/* ===== STATS SECTION ===== */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard title="Pending" value={pending} color="yellow" />
        <StatCard title="Accepted" value={accepted} color="blue" />
        <StatCard title="Completed" value={completed} color="green" />
      </div>

      {/* ===== BOOKINGS LIST ===== */}
      <div className="space-y-6">
        {bookings.map((booking) => (
          <Card
            key={booking.id}
            className="rounded-2xl shadow-sm hover:shadow-lg transition"
          >
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

                  {/* REJECT CONFIRMATION */}
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
        ))}
      </div>

    </div>
  )
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value, color = "indigo" }) {
  return (
    <div className={`rounded-2xl p-6 shadow-sm bg-${color}-50`}>
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className={`text-3xl font-bold text-${color}-600`}>
        {value}
      </p>
    </div>
  )
}

function StatusBadge({ status }) {
  const colorMap = {
    PENDING: "yellow",
    ACCEPTED: "blue",
    COMPLETED: "green",
    REJECTED: "red"
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium bg-${colorMap[status]}-100 text-${colorMap[status]}-700`}
    >
      {status}
    </span>
  )
}
