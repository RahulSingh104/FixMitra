import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
// import { useUser } from "@/hooks/useUser"
import useUser from "@/hooks/useUser"


export default function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useUser()

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b">
      <div className="w-full px-8 py-4 flex justify-between items-center">


        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          FixMitra
        </h1>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link to="/services" className="hover:text-indigo-600 transition">
            Services
          </Link>

          {!user && (
            <>
              <Link to="/login">Login</Link>
              <Button size="sm" onClick={() => navigate("/register")}>
                Register
              </Button>
            </>
          )}

          {user && (
            <>
              <Button size="sm" variant="outline" onClick={logout}>
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
