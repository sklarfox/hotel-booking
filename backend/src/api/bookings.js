import express from 'express'
import { Booking } from '../models/schema.js'
const router = express.Router()

router.get('/', async (req, res) => {
  const bookings = Booking.findAll()
  res.json(bookings)
})

router.post('/', async (req, res) => {
  // TODO create booking
  res.send(201)
})

router.put('/:id', async (req, res) => {
  // TODO update booking
  res.send(204)
})

router.delete('/:id', async (req, res) => {
  // TODO delete booking
  res.send(204)
})

export default router
