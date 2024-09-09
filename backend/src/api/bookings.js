import express from 'express'

const router = express.Router()

const mockBookings = [
  {
    roomId: 1,
    clientId: 101,
    checkInDate: '2024-09-08',
    checkOutDate: '2024-09-10',
  },
  {
    roomId: 2,
    clientId: 102,
    checkInDate: '2024-09-09',
    checkOutDate: '2024-09-11',
  },
  {
    roomId: 1,
    clientId: 103,
    checkInDate: '2024-09-11',
    checkOutDate: '2024-09-13',
  },
  {
    roomId: 3,
    clientId: 104,
    checkInDate: '2024-09-09',
    checkOutDate: '2024-09-12',
  },
  {
    roomId: 2,
    clientId: 105,
    checkInDate: '2024-09-10',
    checkOutDate: '2024-09-15',
  },
  {
    roomId: 3,
    clientId: 106,
    checkInDate: '2024-09-14',
    checkOutDate: '2024-09-16',
  },
]

router.get('/', (req, res) => {
  // TODO get bookings
  res.json(mockBookings)
})

router.post('/', (req, res) => {
  // TODO create booking
  res.send(201)
})

router.put('/:id', (req, res) => {
  // TODO update booking
  res.send(204)
})

router.delete('/:id', (req, res) => {
  // TODO delete booking
  res.send(204)
})

export default router
