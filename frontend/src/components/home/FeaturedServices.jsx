import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function FeaturedServices() {
  const navigate = useNavigate()

  const featured = [
    {
      id: 1,
      title: "Home Cleaning",
      price: 999,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
    },
    {
      id: 2,
      title: "AC Service & Repair",
      price: 599,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1581093588401-22c1d09a52f9",
    },
    {
      id: 3,
      title: "Salon at Home",
      price: 1299,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
    },
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">
            Most Popular Services
          </h2>

          <button
            onClick={() => navigate("/services")}
            className="text-indigo-600 font-medium hover:underline"
          >
            View All →
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-10">

          {featured.map((service) => (
            <Card
              key={service.id}
              className="overflow-hidden rounded-2xl hover:shadow-2xl transition duration-300 group"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-56 w-full object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full flex items-center gap-1 text-sm shadow">
                  <Star size={14} className="text-yellow-500 fill-yellow-500" />
                  {service.rating}
                </div>
              </div>

              <CardContent className="p-6 space-y-3">
                <h3 className="text-lg font-semibold">
                  {service.title}
                </h3>

                <p className="text-indigo-600 font-bold text-xl">
                  ₹{service.price}
                </p>

                <Button
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={() => navigate("/services")}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}

        </div>

      </div>
    </section>
  )
}
