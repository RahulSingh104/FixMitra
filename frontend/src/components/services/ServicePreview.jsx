import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import API from "@/api/api"

export default function ServicePreview() {
  const [services, setServices] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await API.get("/services")
        setServices(res.data.slice(0, 3))
      } catch (err) {
        console.error("Preview fetch error", err)
      }
    }

    fetchServices()
  }, [])

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {services.map((service) => (
        <Card
          key={service.id}
          className="rounded-2xl hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer"
        >
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-semibold">
              {service.title}
            </h3>

            <p className="text-gray-500 text-sm">
              {service.description?.slice(0, 80)}...
            </p>

            <p className="font-bold text-indigo-600">
              ₹{service.price}
            </p>

            <Button
              className="w-full"
              onClick={() =>
                navigate(`/services/${service.id}`)
              }
            >
              View Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
