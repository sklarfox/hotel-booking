import { DarkThemeToggle, Navbar } from "flowbite-react";
import { Datepicker } from "flowbite-react";

function Component() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="">
        <img src="/hotel.svg" className="mr-3 h-6 sm:h-9" alt="Hotel Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Hotel Booking
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

function App() {
  return (
    <>
      <Component />
      <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
        <h1 className="text-2xl dark:text-white">Hotel Booking</h1>
        <Datepicker />
        <DarkThemeToggle />
      </main>
    </>
  );
}

export default App;
