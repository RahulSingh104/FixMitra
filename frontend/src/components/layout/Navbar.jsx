import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

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

          {user ? (
            <div className="flex items-center gap-4">
              <span className="font-medium text-gray-700">{user.name}</span>

              {/* PROVIDER MENU */}
              {user.role === "PROVIDER" && (
                <>
                  <Link
                    to="/provider/dashboard"
                    className="hover:text-indigo-600 transition"
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/provider/add-service"
                    className="hover:text-indigo-600 transition"
                  >
                    Add Service
                  </Link>
                </>
              )}

              {/* ADMIN MENU */}
              {user.role === "ADMIN" && (
                <Link to="/admin" className="hover:text-indigo-600 transition">
                  Admin Panel
                </Link>
              )}

              <Button size="sm" variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login">Login</Link>
              <Button onClick={() => navigate("/register")}>Register</Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
