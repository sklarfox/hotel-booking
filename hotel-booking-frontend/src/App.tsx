import { useState, useEffect } from 'react'
import { CardGrid, Room } from './components/CardGrid'
import { Header } from './components/Header'
import { DateSelector } from './components/DateSelector'

import { Alert, Modal, Label, Button } from 'flowbite-react'

const AlertBar = ({ alert }: { alert: string }) => {
  return (
    <Alert color="warning" rounded>
      <span className="font-medium">Alert!</span> {alert}
    </Alert>
  )
}

interface BookingData {
  userEmail: string
  checkInDate: Date
  checkOutDate: Date
  room: Room
}

interface BookingModalProps {
  show: boolean
  bookingData: BookingData
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const BookingModal = ({ show, room, setOpenModal }: BookingModalProps) => {
  if (!room) return null
  return (
    <Modal dismissible show={show} onClose={() => setOpenModal(false)}>
      <Modal.Header>
        <Modal.Body>
          <div className="content-center space-y-6">
            <h3 className="text-xl font-semibold">Reserve A Room</h3>
            <h4>{room.name}</h4>
          </div>
        </Modal.Body>
      </Modal.Header>
    </Modal>
  )
}

function App() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [alert, setAlert] = useState('')
  const [checkIn, setCheckIn] = useState<Date>(new Date())
  const [checkOut, setCheckOut] = useState<Date>(new Date())
  const [bookingData, setBookingData] = useState<BookingData>({})
  const [openModal, setOpenModal] = useState(true)

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + 'rooms')
      .then(response => response.json())
      .then(data => setRooms(data))
      .catch(error => console.error('Error fetching rooms:', error))
  }, [])
  return (
    <>
      <Header></Header>
      <BookingModal show={openModal} setOpenModal={setOpenModal}></BookingModal>
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
        <CardGrid rooms={rooms} setBookingData={setBookingData}></CardGrid>
      </main>
    </>
  )
}

export default App
