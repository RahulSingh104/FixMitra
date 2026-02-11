import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import useUser from "@/hooks/useUser"

export default function Navbar() {
  const user = useUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <div className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
  UrbanClap
</Link>


        <div className="flex gap-4 items-center">
          <Link to="/services">
            <Button variant="ghost">Services</Button>
          </Link>

          {user ? (
            <>
              <span className="text-sm text-gray-500">
                {user.role}
              </span>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
