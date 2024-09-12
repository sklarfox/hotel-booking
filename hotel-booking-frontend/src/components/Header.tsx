import { Navbar, DarkThemeToggle } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'

export default () => {
  const location = useLocation()
  const currentPath = location.pathname
  console.log(currentPath)
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
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/" active={currentPath === '/book'}>
          Book A Room
        </Navbar.Link>
        <Navbar.Link href="/bookings" active={currentPath === '/bookings'}>
          Bookings
        </Navbar.Link>
        <Navbar.Link href="/rooms" active={currentPath === '/rooms'}>
          Rooms
        </Navbar.Link>
      </Navbar.Collapse>
      <div className="flex md:order-2">
        <DarkThemeToggle />
      </div>
    </Navbar>
  )
}
