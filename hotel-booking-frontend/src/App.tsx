import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { CardGrid, Room } from './components/CardGrid'
import Header from './components/Header'
import BookingRoute from './components/BookingRoute'

import { Button } from 'flowbite-react'

function App() {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<BookingRoute />} />
      </Routes>
    </Router>
  )
}

export default App
