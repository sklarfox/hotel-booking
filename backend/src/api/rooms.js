import express from 'express'

const router = express.Router()

const mockRooms = [
  { id: 1, name: 'Room A', availableDates: ['2024-01-01'] },
  { id: 2, name: 'ROom B', availableDates: ['2024-01-02'] },
  { id: 3, name: 'Room C', availableDates: ['2024-01-01'] },
]

router.get('/', (req, res) => {
  // TODO get rooms
  res.json(mockRooms)
})

router.post('/', (req, res) => {
  // TODO create room
  res.send(201)
})

router.put('/:id', (req, res) => {
  // TODO update room
  res.send(204)
})

router.delete('/:id', (req, res) => {
  // TODO delete room
  res.send(204)
})

export default router
