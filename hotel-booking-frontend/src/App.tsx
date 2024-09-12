import { useState, useEffect } from 'react'
import { CardGrid, Room } from './components/CardGrid'
import { Header } from './components/Header'
import { DateSelector } from './components/DateSelector'
import { getNumberOfNights, getTomorrow } from './utils/helpers'

import { Alert, Modal, Button } from 'flowbite-react'

const AlertBar = ({ alert }: { alert: string }) => {
  if (alert.includes('confirmed')) {
    return (
      <Alert color="success" rounded>
        <span className="font-medium">Success!</span> {alert}
      </Alert>
    )
  } else {
    return (
      <Alert color="warning" rounded>
        <span className="font-medium">Alert!</span> {alert}
      </Alert>
    )
  }
}

interface BookingModalProps {
  setAlert: React.Dispatch<React.SetStateAction<string>>
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  checkIn: Date
  checkOut: Date
  room: Room | undefined
}

const BookingModal = ({
  setAlert,
  setRooms,
  showModal,
  setShowModal,
  checkIn,
  checkOut,
  room,
}: BookingModalProps) => {
  if (room === undefined) {
    return null
  }

  const handleReservationClick = async () => {
    const response = await fetch(import.meta.env.VITE_API_URL + 'bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        roomId: room.id,
        clientEmail: 'hello@hello.com', // TODO remove hardcoded email
        checkInDate: checkIn.toISOString().split('T')[0],
        checkOutDate: checkOut.toISOString().split('T')[0],
      }),
    })

    if (response.ok) {
      setAlert('Your reservation is confirmed!')
      setShowModal(false)
      setRooms(prev => prev.filter(ele => ele !== room))
    } else {
      setAlert('Your reservation could not be booked. Please try again.')
      setShowModal(false)
    }
  }
  return (
    <Modal dismissible show={showModal} onClose={() => setShowModal(false)}>
      <Modal.Header>Book Your Room</Modal.Header>
      <Modal.Body>
        <div className="dark:text-white">
          <p className="text-lg">
            <strong>{room.name}</strong>
          </p>
          <p>Check in: {checkIn.toDateString()}</p>
          <p>Check out: {checkOut.toDateString()}</p>
          <p>Price: ${room.price / 100} / night</p>
          <p className="text-lg">
            Total: ${(getNumberOfNights(checkIn, checkOut) * room.price) / 100}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleReservationClick}>
          🌴 Complete Reservation
        </Button>
        <Button onClick={() => setShowModal(false)}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}

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
