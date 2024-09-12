import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { useState } from 'react'
import Header from './components/Header'
import BookingRoute from './routes/BookingRoute'
import BookingsRoute from './routes/BookingsRoute'
import RoomsRoute from './routes/RoomsRoute'
import RequireAuth from './routes/RequireAuth'
import Login from './components/Login'

function App() {
  const [user, setUser] = useState(null)

  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route
          path="/"
          element={user ? <></> : <Navigate replace to="/login" />}
        />
        <Route element={<RequireAuth user={user} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/book" element={<BookingRoute />} />
          <Route path="/bookings" element={<BookingsRoute />} />
          <Route path="/rooms" element={<RoomsRoute />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
