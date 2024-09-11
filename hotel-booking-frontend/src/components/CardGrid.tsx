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
  setBookingData: React.Dispatch<React.SetStateAction<Room | undefined>>
}

const RoomCard = ({ room, setBookingData }: RoomCardProps) => {
  const handleBookRoom = () => {
    setBookingData(room)
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
  setBookingData: React.Dispatch<React.SetStateAction<Room | undefined>>
}

export const CardGrid = ({ rooms, setBookingData }: CardGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {rooms.map(room => (
        <RoomCard
          key={room.id}
          room={room}
          setBookingData={setBookingData}
        ></RoomCard>
      ))}
    </div>
  )
}
