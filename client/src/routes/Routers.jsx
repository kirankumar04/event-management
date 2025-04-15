import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from '../pages/Home'
import EventDetails from '../pages/EventDetails'
import Event from '../pages/Events'
import About from '../pages/About'
import Login from '../pages/Login'
import Signup from '../pages/Signup'


const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/events' element={<Event />} />
      <Route path='/events/:id' element={<EventDetails />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/about' element={<About />} />
      <Route path='*' element={<h1 className='text-center text-3xl'>404 Not Found</h1>} />
    </Routes>
  )
}

export default Routers
