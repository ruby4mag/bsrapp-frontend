import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export default function App() {
  useEffect(() => {

    document.getElementById("initialloading").style.display = "none"

  }, [])
  return (


    <div className="flex flex-col min-h-screen">



      <main className='container py-3 mx-auto flex-grow'>
        <Outlet />
      </main>
      <Footer />
    </div>

  )
}
