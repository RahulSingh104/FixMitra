// import { useEffect, useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import API from "@/api/api"
// import { useToast } from "@/components/ui/use-toast"

// export default function AddService() {
//   const { toast } = useToast()

//   const [categories, setCategories] = useState([])
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     price: "",
//     location: "",
//     categoryId: "",
//   })

//   useEffect(() => {
//     API.get("/services/category").then((res) => {
//       setCategories(res.data)
//     })
//   }, [])

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     await API.post("/services", form)

//     toast({
//       title: "Service created successfully",
//     })

//     setForm({
//       title: "",
//       description: "",
//       price: "",
//       location: "",
//       categoryId: "",
//     })
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-8">
//       <Card className="rounded-2xl shadow-md">
//         <CardHeader>
//           <CardTitle>Add New Service</CardTitle>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <Label>Title</Label>
//               <Input
//                 value={form.title}
//                 onChange={(e) =>
//                   setForm({ ...form, title: e.target.value })
//                 }
//               />
//             </div>

//             <div>
//               <Label>Description</Label>
//               <Input
//                 value={form.description}
//                 onChange={(e) =>
//                   setForm({ ...form, description: e.target.value })
//                 }
//               />
//             </div>

//             <div>
//               <Label>Price</Label>
//               <Input
//                 type="number"
//                 value={form.price}
//                 onChange={(e) =>
//                   setForm({ ...form, price: e.target.value })
//                 }
//               />
//             </div>

//             <div>
//               <Label>Location</Label>
//               <Input
//                 value={form.location}
//                 onChange={(e) =>
//                   setForm({ ...form, location: e.target.value })
//                 }
//               />
//             </div>

//             <div>
//               <Label>Category</Label>
//               <select
//                 className="w-full border rounded-md p-2"
//                 value={form.categoryId}
//                 onChange={(e) =>
//                   setForm({ ...form, categoryId: e.target.value })
//                 }
//               >
//                 <option value="">Select Category</option>
//                 {categories.map((cat) => (
//                   <option key={cat.id} value={cat.id}>
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <Button className="w-full">Create Service</Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }


import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import API from "@/api/api"
import MapPicker from "@/components/map/MapPicker"

export default function AddService() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [location, setLocation] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [categories, setCategories] = useState([])
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    API.get("/services/category")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      await API.post("/services", {
        title,
        description,
        price: parseFloat(price),
        location,
        categoryId,
        latitude,
        longitude,
      })

      alert("Service Added Successfully 🚀")

      setTitle("")
      setDescription("")
      setPrice("")
      setLocation("")
      setCategoryId("")
      setLatitude(null)
      setLongitude(null)

    } catch (error) {
      console.error("Service creation failed", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-10">
      <Card className="rounded-2xl shadow-xl">
        <CardContent className="p-8 space-y-6">

          <h1 className="text-3xl font-bold">
            Add New Service
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            <input
              type="text"
              placeholder="Service Title"
              className="w-full border rounded-lg px-4 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              placeholder="Service Description"
              className="w-full border rounded-lg px-4 py-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Price"
              className="w-full border rounded-lg px-4 py-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Location Name"
              className="w-full border rounded-lg px-4 py-2"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />

            <select
              className="w-full border rounded-lg px-4 py-2"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* MAP PICKER */}
            <div>
              <h2 className="text-lg font-semibold mb-2">
                Select Service Location on Map
              </h2>

              <MapPicker
                setLatitude={setLatitude}
                setLongitude={setLongitude}
              />

              {latitude && longitude && (
                <p className="text-sm text-gray-500 mt-2">
                  Selected: {latitude}, {longitude}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Service"}
            </Button>

          </form>

        </CardContent>
      </Card>
    </div>
  )
}

