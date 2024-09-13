import { useEffect, useState } from 'react'
import { Table } from 'flowbite-react'
import { BookingRow, BookingForm, Booking } from '../components/BookingTable'

interface BookingsRouteProps {
  user: string | null
  setAlert: React.Dispatch<React.SetStateAction<string>>
}

const BookingsRoute = ({ user, setAlert }: BookingsRouteProps) => {
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + 'bookings', {
      headers: {
        Authorization: `Basic ${user}`,
      },
    })
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(error => console.error('Error fetching bookings:', error))
  }, [])

  const [bookings, setBookings] = useState<Booking[]>([])
  const [showForm, setShowForm] = useState<boolean | number>(0)

  return (
    <main className="flex min-h-screen justify-center gap-2 p-10 dark:bg-gray-600">
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Client Email</Table.HeadCell>
            <Table.HeadCell>Booking Number</Table.HeadCell>
            <Table.HeadCell>Check In</Table.HeadCell>
            <Table.HeadCell>Check Out</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Actions</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {bookings.map(booking => (
              <BookingRow
                key={booking.id}
                booking={booking}
                user={user}
                setBookings={setBookings}
                setAlert={setAlert}
                setShowForm={setShowForm}
              />
            ))}
          </Table.Body>
        </Table>
        <div className="m-4 flex items-center justify-center">
          {showForm ? (
            <BookingForm
              setShowForm={setShowForm}
              user={user}
              setBookings={setBookings}
              setAlert={setAlert}
              booking={bookings.find(b => b.id === showForm)}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </main>
  )
}

export default BookingsRoute
