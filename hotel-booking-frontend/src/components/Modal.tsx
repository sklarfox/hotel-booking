import { Room } from './CardGrid'
import { Modal, Button } from 'flowbite-react'
import { getNumberOfNights } from '../utils/helpers'

interface BookingModalProps {
  setAlert: React.Dispatch<React.SetStateAction<string>>
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  checkIn: Date
  checkOut: Date
  room: Room | undefined
}

export const BookingModal = ({
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
