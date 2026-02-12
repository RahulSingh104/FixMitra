// import React from 'react'

// const App = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default App


import { BrowserRouter } from "react-router-dom"
import Navbar from "@/components/layout/Navbar"
import AppRoutes from "@/routes/AppRoutes"
import { Toaster } from "@/components/ui/toaster"
import Footer from "@/components/layout/Footer"

function App() {
  return (
    <BrowserRouter>
      {/* Global Navigation */}
      <Navbar />

      {/* Application Routes */}
      <AppRoutes />

      <Footer />
      
      {/* Global Toast Notifications */}
      <Toaster />
    </BrowserRouter>
  )
}

export default App
