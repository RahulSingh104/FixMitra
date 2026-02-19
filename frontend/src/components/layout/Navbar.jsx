// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import useAuth from "@/hooks/useAuth";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();

//   return (
//     <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b">
//       <div className="w-full px-8 py-4 flex justify-between items-center">
//         {/* Logo */}
//         <h1
//           onClick={() => navigate("/")}
//           className="text-xl font-bold cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
//         >
//           FixMitra
//         </h1>

//         {/* Links */}
//         <div className="flex items-center gap-6">
//           <Link to="/services" className="hover:text-indigo-600 transition">
//             Services
//           </Link>

//           {user ? (
//             <div className="flex items-center gap-4">
//               <span className="font-medium text-gray-700">{user.name}</span>

//               {/* PROVIDER MENU */}
//               {user.role === "PROVIDER" && (
//                 <>
//                   <Link
//                     to="/provider/dashboard"
//                     className="hover:text-indigo-600 transition"
//                   >
//                     Dashboard
//                   </Link>

//                   <Link
//                     to="/provider/add-service"
//                     className="hover:text-indigo-600 transition"
//                   >
//                     Add Service
//                   </Link>
//                 </>
//               )}

//               {/* ADMIN MENU */}
//               {user.role === "ADMIN" && (
//                 <Link to="/admin" className="hover:text-indigo-600 transition">
//                   Admin Panel
//                 </Link>
//               )}

//               <Button size="sm" variant="outline" onClick={logout}>
//                 Logout
//               </Button>
//             </div>
//           ) : (
//             <div className="flex items-center gap-4">
//               <Link to="/login">Login</Link>
//               <Button onClick={() => navigate("/register")}>Register</Button>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }



import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b">
      <div className="container-global py-4 flex justify-between items-center">
        
        {/* LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          FixMitra
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/services" className="hover:text-indigo-600 transition">
            Services
          </Link>

          {user ? (
            <>
              <span className="font-medium text-gray-700">
                {user.name}
              </span>

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

              {user.role === "ADMIN" && (
                <Link
                  to="/admin"
                  className="hover:text-indigo-600 transition"
                >
                  Admin Panel
                </Link>
              )}

              <Button size="sm" variant="outline" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Button onClick={() => navigate("/register")}>
                Register
              </Button>
            </>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white border-t px-6 py-4 space-y-4">
          <Link
            to="/services"
            onClick={() => setOpen(false)}
            className="block"
          >
            Services
          </Link>

          {user ? (
            <>
              <p className="font-medium">{user.name}</p>

              {user.role === "PROVIDER" && (
                <>
                  <Link
                    to="/provider/dashboard"
                    onClick={() => setOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/provider/add-service"
                    onClick={() => setOpen(false)}
                  >
                    Add Service
                  </Link>
                </>
              )}

              {user.role === "ADMIN" && (
                <Link to="/admin" onClick={() => setOpen(false)}>
                  Admin Panel
                </Link>
              )}

              <Button onClick={logout} className="w-full">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>
                Login
              </Link>

              <Button
                onClick={() => {
                  navigate("/register");
                  setOpen(false);
                }}
                className="w-full"
              >
                Register
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
