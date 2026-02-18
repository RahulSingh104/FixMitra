import { BrowserRouter, useLocation } from "react-router-dom"
import { AnimatePresence,motion } from "framer-motion"
import Navbar from "@/components/layout/Navbar"
import AppRoutes from "@/routes/AppRoutes"
import { Toaster } from "@/components/ui/toaster"
import Footer from "@/components/layout/Footer"

const MotionDiv = motion.div;

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <MotionDiv
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.35 }}
      >
        <AppRoutes />
      </MotionDiv>
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
