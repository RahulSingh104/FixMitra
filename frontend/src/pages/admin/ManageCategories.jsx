import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import API from "@/api/api"

export default function ManageCategories() {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState("")

  const fetchCategories = () => {
    API.get("/services/category").then((res) => {
      setCategories(res.data)
    })
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const createCategory = async () => {
    await API.post("/services/category", { name })
    setName("")
    fetchCategories()
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">
      <h2 className="text-xl font-semibold">
        Manage Categories
      </h2>

      <div className="flex gap-4">
        <Input
          placeholder="New category"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={createCategory}>
          Add
        </Button>
      </div>

      {categories.map((cat) => (
        <Card key={cat.id}>
          <CardContent className="p-4">
            {cat.name}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
