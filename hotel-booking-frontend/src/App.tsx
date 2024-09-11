import { useState, useEffect } from 'react'
import { CardGrid, Room } from './components/CardGrid'
import { Header } from './components/Header'

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
      <CardGrid rooms={rooms}></CardGrid>
    </>
  )
}

export default App
