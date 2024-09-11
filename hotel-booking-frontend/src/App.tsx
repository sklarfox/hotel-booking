import { useState, useEffect } from 'react'
import { CardGrid, Room } from './components/CardGrid'
import { Header } from './components/Header'
import { DateSelector } from './components/DateSelector'

import { Alert } from 'flowbite-react'

const AlertBar = ({ alert }: { alert: string }) => {
  return (
    <Alert color="warning" rounded>
      <span className="font-medium">Alert!</span> {alert}
    </Alert>
  )
}

function App() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [alert, setAlert] = useState('')
  const [checkIn, setCheckIn] = useState<Date>(new Date())
  const [checkOut, setCheckOut] = useState<Date>(new Date())

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + 'rooms')
      .then(response => response.json())
      .then(data => setRooms(data))
      .catch(error => console.error('Error fetching rooms:', error))
  }, [])

  const handleBookingClick = (id: number) => {
    console.log('Booking room with id:', id, checkIn, checkOut)
  }
  return (
    <>
      <Header></Header>
      {alert && <AlertBar alert={alert}></AlertBar>}
      <span className="flex justify-center bg-gray-300 p-8 dark:bg-gray-900">
        <DateSelector
          setRooms={setRooms}
          setAlert={setAlert}
          checkIn={checkIn}
          setCheckIn={setCheckIn}
          checkOut={checkOut}
          setCheckOut={setCheckOut}
        />
      </span>
      <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
        <CardGrid rooms={rooms} onBookingClick={handleBookingClick}></CardGrid>
      </main>
    </>
  )
}

export default App
