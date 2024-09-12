import { Card, Button } from 'flowbite-react'

export interface Room {
  id: number
  name: string
  price: number
  beds: number
  description: string
}

interface RoomCardProps {
  room: Room
  onBookingClick: (id: number) => void
}

const RoomCard = ({ room, onBookingClick }: RoomCardProps) => {
  const handleBookRoom = () => {
    onBookingClick(room.id)
  }

  return (
    <Card
      className="m-2 max-w-sm"
      imgSrc="https://flowbite.com/docs/images/carousel/carousel-1.svg"
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {room.name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {room.description}
      </p>
      <div className="flex justify-evenly">
        <div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            ${room.price / 100}
          </span>
          <span className="text-gray-700 dark:text-gray-400"> / night</span>
        </div>
        <span className="text-lg font-bold text-gray-900 dark:text-white">
          🛌 {room.beds} beds
        </span>
      </div>
      <Button onClick={handleBookRoom}>🌴 Book now!</Button>
    </Card>
  )
}

interface CardGridProps {
  rooms: Room[]
  onBookingClick: (id: number) => void
}

export const CardGrid = ({ rooms, onBookingClick }: CardGridProps) => {
  if (rooms.length === 0) {
    return (
      <main className="dark:bg-color-gray-800 flex h-screen w-screen justify-center">
        <span className="text-2xl dark:text-white">
          No rooms available! Please search for different dates.
        </span>
      </main>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {rooms.map(room => (
        <RoomCard
          key={room.id}
          room={room}
          onBookingClick={onBookingClick}
        ></RoomCard>
      ))}
    </div>
  )
}
