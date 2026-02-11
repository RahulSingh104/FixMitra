
// import { useEffect, useState } from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import API from "@/api/api"

// export default function MyServices() {
//   const [services, setServices] = useState([])

//   useEffect(() => {
//     API.get("/services").then((res) => {
//       setServices(res.data)
//     })
//   }, [])

//   return (
//     <div className="max-w-6xl mx-auto p-10 grid md:grid-cols-3 gap-6">
//       {services.map((service) => (
//         <Card key={service.id}>
//           <CardContent className="p-6">
//             <h3 className="font-semibold">
//               {service.title}
//             </h3>
//             <p className="text-gray-500">
//               ₹{service.price}
//             </p>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   )
// }


import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import API from "@/api/api"

export default function MyServices() {
  const [services, setServices] = useState([])

  useEffect(() => {
    API.get("/services/provider").then((res) => {
      setServices(res.data)
    })
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">

      <h1 className="text-3xl font-bold">My Services</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard title="Total Services" value={services.length} />
        <StatCard
          title="Active Services"
          value={services.length}
          color="green"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {services.map((service) => (
          <Card
            key={service.id}
            className="rounded-2xl shadow-sm hover:shadow-lg transition"
          >
            <CardContent className="p-6 space-y-4">

              <h3 className="font-semibold text-lg">
                {service.title}
              </h3>

              <p className="text-gray-500 text-sm">
                ₹{service.price}
              </p>

              <Badge variant="secondary">
                {service.category?.name}
              </Badge>

              <Button size="sm" variant="outline">
                Manage
              </Button>

            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  )
}

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
