import { useEffect, useState } from 'react'
import { Table, Button } from 'flowbite-react'
import { Room } from '../components/CardGrid'
import { RoomRow } from './RoomRow'
import { RoomForm } from '../components/RoomForm'

export interface RoomRowProps {
  room: Room
  setShowForm: (showForm: boolean) => void
}

const RoomsRoute = ({ user }: { user: string | null }) => {
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + 'rooms', {
      headers: {
        Authorization: `Basic ${user}`,
      },
    })
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(error => console.error('Error fetching rooms:', error))
  }, [])

  const [rooms, setRooms] = useState<Room[]>([])
  const [showForm, setShowForm] = useState(true)

  return (
    <main className="flex min-h-screen justify-center gap-2 p-10 dark:bg-gray-600">
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Room Number</Table.HeadCell>
            <Table.HeadCell>Beds</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Actions</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {rooms.map(room => (
              <RoomRow key={room.id} room={room} setShowForm={setShowForm} />
            ))}
          </Table.Body>
        </Table>
        <div className="m-4 flex items-center justify-center">
          {showForm ? <RoomForm /> : <Button>Add a new room</Button>}
        </div>
      </div>
    </main>
  )
}

export default RoomsRoute
