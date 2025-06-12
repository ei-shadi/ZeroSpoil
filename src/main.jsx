import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router";
import router from "./Routes/Router.jsx";
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './Context/ThemeContext.jsx';
// import AuthProvider from "./Provider/AuthProvider";



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      {/* <AuthProvider> */}
      <ThemeProvider>
        <Toaster position="top-center" richColors />
        <RouterProvider router={router} />
      </ThemeProvider>
      {/* </AuthProvider> */}
    </HelmetProvider>
  </StrictMode>,
)
