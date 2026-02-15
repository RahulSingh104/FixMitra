
// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Star, MapPin, User } from "lucide-react"
// import BookingModal from "@/components/booking/BookingModal"
// import API from "@/api/api"

// export default function ServiceDetail() {
//   const { id } = useParams()
//   const [service, setService] = useState(null)

//   useEffect(() => {
//     API.get(`/services/${id}`).then((res) => {
//       setService(res.data)
//     })
//   }, [id])

//   if (!service) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-gray-500">Loading service...</p>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">

//       {/* LEFT SIDE - MAIN DETAILS */}
//       <div className="md:col-span-2 space-y-8">

//         {/* CATEGORY BADGE */}
//         {service.category && (
//           <Badge variant="secondary">
//             {service.category.name}
//           </Badge>
//         )}

//         <h1 className="text-4xl font-bold">
//           {service.title}
//         </h1>

//         {/* PROVIDER INFO */}
//         {service.provider && (
//           <div className="flex items-center gap-3 text-gray-600">
//             <User size={18} />
//             <span>
//               Provided by <strong>{service.provider.name}</strong>
//             </span>
//           </div>
//         )}

//         {/* LOCATION */}
//         {service.location && (
//           <div className="flex items-center gap-2 text-gray-500">
//             <MapPin size={18} />
//             <span>{service.location}</span>
//           </div>
//         )}

//         {/* RATING */}
//         <div className="flex items-center gap-2 text-yellow-500">
//           <Star size={18} fill="currentColor" />
//           <span className="text-gray-700 font-medium">
//             4.8 (120 reviews)
//           </span>
//         </div>

//         {/* DESCRIPTION */}
//         <Card className="rounded-2xl shadow-sm">
//           <CardContent className="p-6">
//             <h2 className="text-xl font-semibold mb-4">
//               Service Description
//             </h2>
//             <p className="text-gray-600 leading-relaxed">
//               {service.description}
//             </p>
//           </CardContent>
//         </Card>

//       </div>

//       {/* RIGHT SIDE - PRICE & BOOKING */}
//       <div className="sticky top-24 h-fit">

//         <Card className="rounded-2xl shadow-md">
//           <CardContent className="p-8 space-y-6">

//             <div className="text-3xl font-bold text-indigo-600">
//               ₹{service.price}
//             </div>

//             <p className="text-gray-500 text-sm">
//               Transparent pricing. No hidden charges.
//             </p>

//             <BookingModal serviceId={service.id} />

//             <Button
//               variant="outline"
//               className="w-full"
//             >
//               Contact Provider
//             </Button>

//           </CardContent>
//         </Card>

//       </div>
//     </div>
//   )
// }

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import BookingModal from "@/components/booking/BookingModal"
import API from "@/api/api"
import useUser from "@/hooks/useUser"
import StarRating from "@/components/ui/StarRating"

export default function ServiceDetail() {
  const { id } = useParams()
  const { user } = useUser()

  const [service, setService] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serviceRes = await API.get(`/services/${id}`)
        setService(serviceRes.data)

        const reviewRes = await API.get(`/reviews/${id}`)
        setReviews(reviewRes.data)
      } catch (err) {
        console.error("Error loading service", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const submitReview = async () => {
    if (!rating) return

    try {
      await API.post("/reviews", {
        serviceId: id,
        rating,
        comment,
      })

      const reviewRes = await API.get(`/reviews/${id}`)
      setReviews(reviewRes.data)

      setRating(0)
      setComment("")
    } catch (err) {
      console.error("Review failed", err)
    }
  }

  if (loading) return null
  if (!service) return <div>Service not found</div>

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((a, b) => a + b.rating, 0) /
          reviews.length
        ).toFixed(1)
      : 0

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-12">

      {/* LEFT CONTENT */}
      <div className="md:col-span-2 space-y-8">

        {/* HEADER */}
        <div>
          <Badge className="mb-4">
            {service.category?.name}
          </Badge>

          <h1 className="text-4xl font-bold mb-4">
            {service.title}
          </h1>

          <div className="flex items-center gap-3 text-yellow-500">
            <Star size={18} fill="currentColor" />
            <span className="text-gray-700">
              {avgRating} ({reviews.length} reviews)
            </span>
          </div>
        </div>

        {/* DESCRIPTION */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3">
              About this service
            </h3>
            <p className="text-gray-600">
              {service.description}
            </p>
          </CardContent>
        </Card>

        {/* REVIEW SECTION */}
        <Card>
          <CardContent className="p-6 space-y-6">

            <h3 className="text-xl font-semibold">
              Customer Reviews
            </h3>

            {/* Review Form */}
            {user && (
              <div className="space-y-4 border-b pb-6">

                <StarRating
                  rating={rating}
                  setRating={setRating}
                />

                <textarea
                  placeholder="Write your experience..."
                  className="w-full border rounded-lg p-3"
                  value={comment}
                  onChange={(e) =>
                    setComment(e.target.value)
                  }
                />

                <Button onClick={submitReview}>
                  Submit Review
                </Button>

              </div>
            )}

            {/* Review List */}
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border-b pb-4"
              >
                <div className="flex items-center gap-2 text-yellow-500">
                  <Star size={14} fill="currentColor" />
                  <span>{review.rating}</span>
                </div>

                <p className="text-gray-600 mt-2">
                  {review.comment}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {review.user?.name}
                </p>
              </div>
            ))}

          </CardContent>
        </Card>

      </div>

      {/* RIGHT BOOKING */}
      <div className="sticky top-24 h-fit">

        <Card className="shadow-lg">
          <CardContent className="p-6 space-y-6">

            <div>
              <h2 className="text-3xl font-bold text-indigo-600">
                ₹{service.price}
              </h2>
            </div>

            <BookingModal serviceId={service.id} />

          </CardContent>
        </Card>

      </div>

    </div>
  )
}
