import { useEffect, useState } from 'react'
import { Table, Button, Label, TextInput } from 'flowbite-react'
import { Room } from '../components/CardGrid'

interface RoomRowProps {
  room: Room
  setShowForm: (showForm: boolean) => void
}

const RoomRow = ({ room }: RoomRowProps) => {
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell>{room.name}</Table.Cell>
      <Table.Cell>{room.id}</Table.Cell>
      <Table.Cell>{room.beds}</Table.Cell>
      <Table.Cell>${room.price / 100}</Table.Cell>
      <Table.Cell>
        <div className="flex justify-end space-x-2">
          <Button size="small">Edit</Button>
          <Button size="small">Delete</Button>
        </div>
      </Table.Cell>
    </Table.Row>
  )
}

const RoomForm = () => {
  const [name, setName] = useState('')
  const [beds, setBeds] = useState('')
  const [price, setPrice] = useState('')

  const handleRoomSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = {
      name,
      beds,
      price,
    }
    fetch(import.meta.env.VITE_API_URL + 'rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(data => console.log('new room', data))
      .catch(error => console.error('Error creating room:', error))
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleRoomSubmit}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Room Name" />
        </div>
        <TextInput
          id="name"
          type="text"
          placeholder=""
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="beds" value="Beds" />
        </div>
        <TextInput
          id="beds"
          type="text"
          value={beds}
          onChange={e => setBeds(e.target.value)}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="price" value="Price" />
        </div>
        <TextInput
          id="price"
          type="text"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center gap-2"></div>
      <Button type="submit">Submit</Button>
    </form>
  )
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
