import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from './components/Header'
import BookingRoute from './routes/BookingRoute'
import BookingsRoute from './routes/BookingsRoute'
import RoomsRoute from './routes/RoomsRoute'
import RequireAuth from './routes/RequireAuth'
import Login from './components/Login'
import { AlertBar } from './components/Alert'

function App() {
  const [user, setUser] = useState<string | null>(null)
  const [alert, setAlert] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert('')
    }, 5000)
    return () => clearTimeout(timeout)
  }, [alert])

  useEffect(() => {
    setUser(localStorage.getItem('user'))
  }, [user])

  return (
    <Router>
      <Header></Header>
      {alert && <AlertBar alert={alert}></AlertBar>}
      <Routes>
        <Route
          path="/"
          element={user ? <></> : <Navigate replace to="/login" />}
        />
        <Route element={<RequireAuth user={user} />}>
          <Route
            path="/login"
            element={<Login setUser={setUser} setAlert={setAlert} />}
          />
          <Route
            path="/book"
            element={<BookingRoute user={user} setAlert={setAlert} />}
          />
          <Route
            path="/bookings"
            element={<BookingsRoute user={user} setAlert={setAlert} />}
          />
          <Route
            path="/rooms"
            element={<RoomsRoute user={user} setAlert={setAlert} />}
          />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
