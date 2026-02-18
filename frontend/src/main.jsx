import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'

import "mapbox-gl/dist/mapbox-gl.css"


createRoot(document.getElementById('root')).render(
  
    <AuthProvider>
      <App />
    </AuthProvider>,
)
