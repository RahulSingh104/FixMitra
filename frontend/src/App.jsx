import { BrowserRouter, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Navbar from "@/components/layout/Navbar"
import AppRoutes from "@/routes/AppRoutes"
import { Toaster } from "@/components/ui/toaster"
import Footer from "@/components/layout/Footer"

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <AppRoutes key={location.pathname} />
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      {/* Global Navigation */}
      <Navbar />

      {/* Application Routes with Animation */}
      <AnimatedRoutes />

      {/* Footer */}
      <Footer />

      {/* Global Toast Notifications */}
      <Toaster />
    </BrowserRouter>
  )
}

export default App
