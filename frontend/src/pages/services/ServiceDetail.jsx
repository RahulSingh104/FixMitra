
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, User } from "lucide-react"
import BookingModal from "@/components/booking/BookingModal"
import API from "@/api/api"

export default function ServiceDetail() {
  const { id } = useParams()
  const [service, setService] = useState(null)

  useEffect(() => {
    API.get(`/services/${id}`).then((res) => {
      setService(res.data)
    })
  }, [id])

  if (!service) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading service...</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">

      {/* LEFT SIDE - MAIN DETAILS */}
      <div className="md:col-span-2 space-y-8">

        {/* CATEGORY BADGE */}
        {service.category && (
          <Badge variant="secondary">
            {service.category.name}
          </Badge>
        )}

        <h1 className="text-4xl font-bold">
          {service.title}
        </h1>

        {/* PROVIDER INFO */}
        {service.provider && (
          <div className="flex items-center gap-3 text-gray-600">
            <User size={18} />
            <span>
              Provided by <strong>{service.provider.name}</strong>
            </span>
          </div>
        )}

        {/* LOCATION */}
        {service.location && (
          <div className="flex items-center gap-2 text-gray-500">
            <MapPin size={18} />
            <span>{service.location}</span>
          </div>
        )}

        {/* RATING */}
        <div className="flex items-center gap-2 text-yellow-500">
          <Star size={18} fill="currentColor" />
          <span className="text-gray-700 font-medium">
            4.8 (120 reviews)
          </span>
        </div>

        {/* DESCRIPTION */}
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Service Description
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {service.description}
            </p>
          </CardContent>
        </Card>

      </div>

      {/* RIGHT SIDE - PRICE & BOOKING */}
      <div className="sticky top-24 h-fit">

        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-8 space-y-6">

            <div className="text-3xl font-bold text-indigo-600">
              ₹{service.price}
            </div>

            <p className="text-gray-500 text-sm">
              Transparent pricing. No hidden charges.
            </p>

            <BookingModal serviceId={service.id} />

            <Button
              variant="outline"
              className="w-full"
            >
              Contact Provider
            </Button>

          </CardContent>
        </Card>

      </div>
    </div>
  )
}
