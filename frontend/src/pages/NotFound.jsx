import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-6">
      <h1 className="text-6xl font-bold text-indigo-600">404</h1>
      <p className="text-lg text-muted-foreground">
        Oops! Page not found.
      </p>
      <Button onClick={() => navigate("/")}>
        Back to Home
      </Button>
    </div>
  )
}
