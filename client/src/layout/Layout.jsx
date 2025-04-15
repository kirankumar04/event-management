import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Routers from '../routes/Routers'

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Routers />
      </main>
      <Footer />
    </>
  )
}

export default Layout
