import { Navbar, DarkThemeToggle, Button } from 'flowbite-react'
import { useLocation, useNavigate } from 'react-router-dom'

export default () => {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname

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
        <Navbar.Link
          onClick={() => navigate('/book')}
          active={currentPath === '/'}
          className="cursor-pointer"
        >
          Book A Room
        </Navbar.Link>
        <Navbar.Link
          onClick={() => navigate('/bookings')}
          active={currentPath === '/bookings'}
          className="cursor-pointer"
        >
          Bookings
        </Navbar.Link>
        <Navbar.Link
          onClick={() => navigate('/rooms')}
          active={currentPath === '/rooms'}
          className="cursor-pointer"
        >
          Rooms
        </Navbar.Link>
      </Navbar.Collapse>
      <div className="flex md:order-2">
        <Button
          onClick={() => {
            localStorage.removeItem('user')
            navigate('/login')
          }}
        >
          Logout
        </Button>
        <DarkThemeToggle />
      </div>
    </Navbar>
  )
}
