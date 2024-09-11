import { Navbar, Button, DarkThemeToggle } from 'flowbite-react'

export const Header = () => {
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
