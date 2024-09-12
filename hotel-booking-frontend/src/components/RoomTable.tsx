import { Label, TextInput, Button, Table } from 'flowbite-react'
import { useState } from 'react'
import { Room } from './CardGrid'

interface RoomRowProps {
  room: Room
  user: string | null
  setAlert: React.Dispatch<React.SetStateAction<string>>
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>
}

interface RoomFormProps {
  user: string | null
  setShowForm: (showForm: boolean) => void
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>
  setAlert: React.Dispatch<React.SetStateAction<string>>
}

export const RoomForm = ({
  setShowForm,
  setRooms,
  setAlert,
  user,
}: RoomFormProps) => {
  const [name, setName] = useState('')
  const [beds, setBeds] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')

  const handleRoomSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = {
      name,
      beds: Number(beds),
      price: Number(price) * 100,
      description,
    }

    if (!user || Number.isNaN(beds) || Number.isNaN(price)) {
      setAlert('Please fill out all required fields and check the formatting.')
      return
    }

    fetch(import.meta.env.VITE_API_URL + 'rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${user}`,
      },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(data => {
        setRooms(prev => [...prev, data])
        setName('')
        setBeds('')
        setPrice('')
        setShowForm(false)
      })
      .catch(error => {
        console.error('Error creating room:', error)
        setAlert('Error creating room, please try again.')
      })
  }

  const handleCancelClick = () => {
    setName('')
    setBeds('')
    setPrice('')
    setShowForm(false)
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
          placeholder="$"
          onChange={e => setPrice(e.target.value)}
          required
        />
        <div className="mb-2 block">
          <Label htmlFor="description" value="Description (optional)" />
        </div>
        <TextInput
          id="description"
          type="textarea"
          value={description}
          placeholder="Description"
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <Button type="submit">Submit</Button>
        <Button onClick={handleCancelClick}>Cancel</Button>
      </div>
    </form>
  )
}

export const RoomRow = ({ room, user, setAlert, setRooms }: RoomRowProps) => {
  const handleDeleteClick = (id: Number) => {
    fetch(import.meta.env.VITE_API_URL + 'rooms/' + id, {
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${user}`,
      },
    })
      .then(res => {
        if (res.ok) {
          setRooms(prev => prev.filter(r => r.id !== room.id))
        } else {
          setAlert('Error deleting room, please try again.')
        }
      })
      .catch(error => {
        console.error('Error creating room:', error)
        setAlert('Error deleting room, please try again.')
      })
  }

  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell>{room.name}</Table.Cell>
      <Table.Cell>{room.id}</Table.Cell>
      <Table.Cell>{room.beds}</Table.Cell>
      <Table.Cell>${room.price / 100}</Table.Cell>
      <Table.Cell>
        <div className="flex justify-end space-x-2">
          <Button size="small">Edit</Button>
          <Button size="small" onClick={() => handleDeleteClick(room.id)}>
            Delete
          </Button>
        </div>
      </Table.Cell>
    </Table.Row>
  )
}
