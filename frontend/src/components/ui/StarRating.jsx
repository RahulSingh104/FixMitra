import { Star } from "lucide-react"

export default function StarRating({ rating, setRating }) {
  return (
    <div className="flex gap-2 cursor-pointer">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={24}
          onClick={() => setRating(star)}
          className={
            star <= rating
              ? "text-yellow-500 fill-yellow-500"
              : "text-gray-300"
          }
        />
      ))}
    </div>
  )
}
