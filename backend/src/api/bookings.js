import express from 'express'
import { Booking } from '../models/schema.js'
import { getBookingById } from '../utils/helpers.js'
const router = express.Router()

router.get('/', async (req, res) => {
  const bookings = await Booking.findAll()
  res.json(bookings)
})

// TODO validation: date is in future, there isn't an overlapping booking, end date is later than begin date + min 1 day after
router.post('/', async (req, res, next) => {
  const { room_id, client_email, check_in_date, check_out_date } = req.body

  if (
    !room_id ||
    !client_email ||
    !check_in_date ||
    !check_out_date ||
    typeof client_email !== 'string'
  ) {
    res
      .status(400)
      .send(
        'Validation Error: Missing required information. Please verify all required fields and try again.',
      )
    return
  }

  try {
    const newBooking = await Booking.create({
      room_id,
      client_email,
      check_in_date,
      check_out_date,
    })
    res.json(newBooking.dataValues)
  } catch (err) {
    next(err)
  }
  res.status(201)
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

/*
POST bookings

When a user makes a request to reserve:
LATER Verify the room is available (perform a query for bookings of the room that overlap with the date range provided)

Create a new booking entry with the provided params
Return the booking entry

*/
