import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import API from "@/api/api"

const MotionDiv = motion.div;

export default function Categories() {
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/services/category")
        setCategories(res.data)
      } catch (err) {
        console.error("Category fetch failed", err)
      }
    }

    fetchCategories()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-12 text-center"
      >
        All Categories
      </motion.h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {categories.map((cat, index) => (
          <MotionDiv
            key={cat._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
            onClick={() => navigate(`/services?category=${cat._id}`)}
            className="bg-white rounded-2xl p-8 text-center hover:shadow-xl hover:-translate-y-2 transition cursor-pointer"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">
              {cat.name.charAt(0)}
            </div>

            <h3 className="font-semibold">{cat.name}</h3>
          </MotionDiv>
        ))}
      </div>
    </div>
  )
}
