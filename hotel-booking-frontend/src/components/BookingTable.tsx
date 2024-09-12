import { Label, TextInput, Button, Table } from 'flowbite-react'
import { useState } from 'react'

export interface Booking {
  id: number
  clientEmail: string
  roomId: number
  checkInDate: string
  checkOutDate: string
}

interface BookingRowProps {
  booking: Booking
  user: string | null
  setShowForm: (showForm: number | boolean) => void
  setAlert: React.Dispatch<React.SetStateAction<string>>
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>
}

interface BookingFormProps {
  user: string | null
  setShowForm: (showForm: number | boolean) => void
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>
  setAlert: React.Dispatch<React.SetStateAction<string>>
  booking?: Booking
}

export const BookingForm = ({
  setShowForm,
  setBookings,
  setAlert,
  user,
  booking,
}: BookingFormProps) => {
  const [clientEmail, setClientEmail] = useState('')
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')

  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = {
      id: booking?.id,
      clientEmail,
      checkInDate,
      checkOutDate,
    }

    fetch(import.meta.env.VITE_API_URL + 'bookings/' + booking?.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${user}`,
      },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(data => {
        console.log('data', data)
        setBookings(prev => {
          return prev.map(prevBooking =>
            prevBooking.id === data.id ? data : prevBooking,
          )
        })
        setClientEmail('')
        setCheckInDate('')
        setCheckOutDate('')
        setShowForm(false)
      })
      .catch(error => {
        console.error('Error creating booking:', error)
        setAlert('Error creating booking, please try again.')
      })
  }

  const handleCancelClick = () => {
    setClientEmail('')
    setCheckInDate('')
    setCheckOutDate('')
    setShowForm(false)
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleEditSubmit}>
      <div>
        <span className="text-lg font-bold dark:text-white">
          {'Edit Booking'}
        </span>
        <div className="mb-2 block">
          <Label htmlFor="clientEmail" value="Client Email" />
        </div>
        <TextInput
          id="clientEmail"
          type="text"
          placeholder={booking?.clientEmail}
          value={clientEmail}
          onChange={e => setClientEmail(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="checkInDate" value="Check In Date" />
        </div>
        <TextInput
          id="checkInDate"
          type="text"
          placeholder={booking?.checkInDate}
          value={checkInDate}
          onChange={e => setCheckInDate(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="checkOutDate" value="Check Out Date" />
        </div>
        <TextInput
          id="checkOutDate"
          type="text"
          value={checkOutDate}
          placeholder={booking?.checkOutDate}
          onChange={e => setCheckOutDate(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <Button type="submit">Submit</Button>
        <Button onClick={handleCancelClick}>Cancel</Button>
      </div>
    </form>
  )
}

export const BookingRow = ({
  booking,
  user,
  setAlert,
  setBookings,
  setShowForm,
}: BookingRowProps) => {
  const handleDeleteClick = (id: Number) => {
    fetch(import.meta.env.VITE_API_URL + 'bookings/' + id, {
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${user}`,
      },
    })
      .then(res => {
        if (res.ok) {
          setBookings(prev => prev.filter(r => r.id !== booking.id))
        } else {
          setAlert('Error deleting booking, please try again.')
        }
      })
      .catch(error => {
        console.error('Error deleting booking:', error)
        setAlert('Error deleting booking, please try again.')
      })
  }

  const handleEditClick = () => {
    setShowForm(booking.id)
  }

  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell>{booking.clientEmail}</Table.Cell>
      <Table.Cell>{booking.id}</Table.Cell>
      <Table.Cell>{booking.checkInDate}</Table.Cell>
      <Table.Cell>{booking.checkOutDate}</Table.Cell>
      <Table.Cell>
        <div className="flex justify-end space-x-2">
          <Button size="small" onClick={() => handleEditClick()}>
            Edit
          </Button>
          <Button size="small" onClick={() => handleDeleteClick(booking.id)}>
            Delete
          </Button>
        </div>
      </Table.Cell>
    </Table.Row>
  )
}
