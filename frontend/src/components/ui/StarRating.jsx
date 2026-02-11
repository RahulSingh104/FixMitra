import { Star } from "lucide-react"

export default function StarRating({ rating = 4 }) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map((star) => (
        <Star
          key={star}
          size={18}
          className={
            star <= rating
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }
        />
      ))}
    </div>
  )
}
