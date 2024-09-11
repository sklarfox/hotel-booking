'use client'

import { useState, useEffect } from 'react'
import { CardGrid, Room } from './components/CardGrid'
import { Header } from './components/Header'
import { getTomorrow } from './utils/helpers'

import { Datepicker, Button } from 'flowbite-react'

const DateSelector = () => {
  const [selectedCheckInDate, setSelectedCheckInDate] = useState(new Date())
  const [selectedCheckOutDate, setSelectedCheckOutDate] = useState(new Date())

  const handleDateSearch = async () => {
    console.log(
      'searching!',
      selectedCheckInDate.toDateString(),
      selectedCheckOutDate.toDateString(),
    )
  }

  const handleCheckOutDateChange = (newDate: Date) => {
    setSelectedCheckOutDate(newDate)
  }

  const handleCheckInDateChange = (newDate: Date) => {
    setSelectedCheckInDate(newDate)
  }
  return (
    <div className="flex justify-center space-x-4">
      <Datepicker onSelectedDateChanged={handleCheckInDateChange}></Datepicker>
      <Datepicker onSelectedDateChanged={handleCheckOutDateChange}></Datepicker>
      <Button onClick={handleDateSearch}>Search</Button>
    </div>
  )
}

function App() {
  const [rooms, setRooms] = useState<Room[]>([])

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + 'rooms')
      .then(response => response.json())
      .then(data => setRooms(data))
      .catch(error => console.error('Error fetching rooms:', error))
  }, [])
  return (
    <>
      <Header></Header>
      <span className="flex justify-center bg-gray-300 p-8 dark:bg-gray-900">
        <DateSelector />
      </span>
      <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
        <CardGrid rooms={rooms}></CardGrid>
      </main>
    </>
  )
}

export default App
