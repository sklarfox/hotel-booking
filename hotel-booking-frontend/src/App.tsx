import { useState, useEffect } from 'react'
import { CardGrid, Room } from './components/CardGrid'
import { Header } from './components/Header'
import { DateSelector } from './components/DateSelector'
import { AlertBar } from './components/Alert'
import { getTomorrow } from './utils/helpers'
import { BookingModal } from './components/Modal'

import { Button } from 'flowbite-react'

function App() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [alert, setAlert] = useState('')
  const [checkIn, setCheckIn] = useState<Date>(new Date())
  const [checkOut, setCheckOut] = useState<Date>(getTomorrow(new Date()))
  const [showModal, setShowModal] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>(undefined)

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + 'rooms')
      .then(response => response.json())
      .then(data => setRooms(data))
      .catch(error => console.error('Error fetching rooms:', error))
  }, [])

  const handleBookingClick = (id: number) => {
    const room = rooms.find(room => room.id === id)
    setSelectedRoom(room)
    setShowModal(prev => !!room || prev)
  }
  return (
    <>
      <Header></Header>
      <BookingModal
        showModal={showModal}
        setShowModal={setShowModal}
        checkIn={checkIn}
        checkOut={checkOut}
        room={selectedRoom}
        setAlert={setAlert}
        setRooms={setRooms}
      ></BookingModal>
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
