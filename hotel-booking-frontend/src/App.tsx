import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { CardGrid, Room } from './components/CardGrid'
import Header from './components/Header'
import BookingRoute from './routes/BookingRoute'
import BookingsRoute from './routes/BookingsRoute'
import RoomsRoute from './routes/RoomsRoute'

import { Button } from 'flowbite-react'

function App() {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<BookingRoute />} />
        <Route path="/bookings" element={<BookingsRoute />} />
        <Route path="/rooms" element={<RoomsRoute />} />
      </Routes>
    </Router>
  )
}

export default App
