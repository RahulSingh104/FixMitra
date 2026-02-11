// import { useEffect, useState } from "react"
// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { useNavigate } from "react-router-dom"
// import API from "@/api/api"

// export default function Services() {
//   const [services, setServices] = useState([])
//   const [loading, setLoading] = useState(true)
//   const navigate = useNavigate()

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const res = await API.get("/services")
//         setServices(res.data)
//       } catch (error) {
//         console.error("Failed to fetch services", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchServices()
//   }, [])

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-gray-500">Loading services...</p>
//       </div>
//     )
//   }

//   if (services.length === 0) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-gray-500 text-lg">
//           No services available yet 🚀
//         </p>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-8 grid md:grid-cols-3 gap-8">
//       {services.map((service) => (
//         <Card key={service.id} className="hover:shadow-xl transition rounded-2xl">
//           <CardHeader>
//             <h3 className="text-lg font-semibold">{service.title}</h3>
//           </CardHeader>

//           <CardContent className="space-y-3">
//             <p className="text-gray-500">{service.description}</p>

//             <p className="text-primary font-bold">
//               ₹{service.price}
//             </p>

//             <Button
//               className="w-full"
//               onClick={() => navigate(`/services/${service.id}`)}
//             >
//               View Details
//             </Button>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   )
// }




import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import { Star } from "lucide-react"
import API from "@/api/api"

export default function Services() {
  const [services, setServices] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serviceRes = await API.get("/services")
        setServices(serviceRes.data)

        const categoryRes = await API.get("/services/category")
        setCategories(categoryRes.data)
      } catch (error) {
        console.error("Fetch error", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredServices = services
    .filter((service) =>
      service.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((service) =>
      selectedCategory ? service.categoryId === selectedCategory : true
    )

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading services...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-10">

      {/* ===== HEADER + FILTER BAR ===== */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <h1 className="text-3xl font-bold">All Services</h1>

        <div className="flex gap-4 w-full md:w-auto">
          <Input
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64"
          />

          <select
            className="border rounded-md px-4 py-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ===== EMPTY STATE ===== */}
      {filteredServices.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            No services found 🚀
          </p>
        </div>
      )}

      {/* ===== SERVICES GRID ===== */}
      <div className="grid md:grid-cols-3 gap-8">
        {filteredServices.map((service) => (
          <Card
            key={service.id}
            className="rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <CardContent className="p-6 space-y-4">

              {/* CATEGORY BADGE */}
              {service.category && (
                <Badge variant="secondary">
                  {service.category.name}
                </Badge>
              )}

              <h3 className="text-xl font-semibold">
                {service.title}
              </h3>

              <p className="text-gray-500 line-clamp-2">
                {service.description}
              </p>

              {/* PROVIDER */}
              {service.provider && (
                <p className="text-sm text-gray-400">
                  By {service.provider.name}
                </p>
              )}

              {/* PRICE + RATING */}
              <div className="flex justify-between items-center">
                <span className="text-indigo-600 font-bold text-lg">
                  ₹{service.price}
                </span>

                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={16} fill="currentColor" />
                  <span className="text-sm text-gray-600">
                    4.8
                  </span>
                </div>
              </div>

              <Button
                className="w-full"
                onClick={() => navigate(`/services/${service.id}`)}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
