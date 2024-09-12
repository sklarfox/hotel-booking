import { Datepicker, Button } from 'flowbite-react'
import { Room } from './CardGrid'
import { getDateAlert } from '../utils/helpers'

interface DataSelectorProps {
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>
  setAlert: React.Dispatch<React.SetStateAction<string>>
  checkIn: Date
  setCheckIn: React.Dispatch<React.SetStateAction<Date>>
  checkOut: Date
  setCheckOut: React.Dispatch<React.SetStateAction<Date>>
}

export const DateSelector = ({
  setRooms,
  setAlert,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
}: DataSelectorProps) => {
  const handleRoomSearch = async () => {
    const alert = getDateAlert(checkIn, checkOut)
    if (alert) {
      setAlert(alert)
      return
    }
    setAlert('')
    const response = await fetch(
      import.meta.env.VITE_API_URL +
        'rooms' +
        `/?checkInDate=${checkIn.toISOString().split('T')[0]}&checkOutDate=${checkOut.toISOString().split('T')[0]}`,
      {
        headers: {
          Authorization: `Basic ${localStorage.getItem('user')}`,
        },
      },
    )
    if (response.ok) {
      setRooms(await response.json())
    } else {
      setAlert('Error fetching rooms')
    }
  }
  return (
    <>
      <span className="flex items-center justify-center gap-2 dark:bg-gray-800">
        <h2 className="mx-4 text-xl dark:text-white">Check in</h2>
        <Datepicker onSelectedDateChanged={date => setCheckIn(date)} />
        <h2 className="mx-4 text-xl dark:text-white">Check out</h2>
        <Datepicker onSelectedDateChanged={date => setCheckOut(date)} />
        <Button onClick={handleRoomSearch}>Search Availability</Button>
      </span>
    </>
  )
}
