import { DarkThemeToggle, Navbar, Button } from 'flowbite-react'
import { useEffect, useState } from 'react'

function Header() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="">
        <img
          src="/hotel-icon.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Hotel Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Hotel Booking
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button className="mr-2">Book Now</Button>
        <DarkThemeToggle />
      </div>
    </Navbar>
  )
}

function App() {
  const [rooms, setRooms] = useState(['room1', 'room2'])

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + 'rooms')
      .then((response) => response.json())
      .then((data) => setRooms(data))
      .catch((error) => console.error('Error fetching rooms:', error))
  }, [])
  return (
    <>
      <Header></Header>
      {rooms}
    </>
  )
}

export default App
