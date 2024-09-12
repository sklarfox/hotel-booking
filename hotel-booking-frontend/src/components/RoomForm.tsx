import { Label, TextInput, Button } from 'flowbite-react'
import { useState } from 'react'

export const RoomForm = () => {
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
