import express from 'express'
import { Room } from '../models/schema.js'
import {
  findAvailableRoomsByDateRange,
  getRoomById,
} from '../services/databaseService.js'
import { validBookingDates } from '../utils/helpers.js'
import { getWeatherAtCheckIn } from '../services/weatherService.js'

const router = express.Router()

router.get('/', async (req, res, next) => {
  const { checkInDate, checkOutDate } = req.query

  try {
    if (validBookingDates(checkInDate, checkOutDate)) {
      const rooms = await findAvailableRoomsByDateRange(
        checkInDate,
        checkOutDate,
      )

      // TODO remove hardcoding location
      // Ideally each room would have a location parameter which could be used to find the weather for the specific room
      // Current implementation is hardcoding the coordinates for New York City, assumes all rooms are at the same location
      const weatherAtCheckIn = await getWeatherAtCheckIn(
        40.7128,
        -74.006,
        checkInDate,
      )

      let payload = rooms.map(room => room.dataValues)

      payload.forEach(room => {
        room.weatherAtCheckIn = weatherAtCheckIn
      })

      res.json(payload)
    } else if (checkInDate || checkOutDate) {
      res
        .status(400)
        .send('Validation Error: Please check the requested booking dates.')
    } else {
      const rooms = await Room.findAll()
      res.json(rooms)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)

  try {
    const room = await getRoomById(id)

    if (room === null) {
      res
        .status(404)
        .send('Room not found. Please check the room ID and try again.')
      return
    }

    res.json(room)
  } catch (error) {
    res.status(400).send(String(error))
  }
})

router.post('/', async (req, res, next) => {
  const { name, price, beds, description } = req.body

  if (!name || !price || !beds || typeof name !== 'string' || name.length < 1) {
    res
      .status(400)
      .send(
        'Validation Error: Missing required information. Please verify all required fields and try again.',
      )
    return
  }

  try {
    const newRoom = await Room.create({ name, price, beds, description })
    res.status(201).json(newRoom.dataValues)
  } catch (err) {
    next(err)
  }
})

router.patch('/:id', async (req, res, next) => {
  const id = Number(req.params.id)

  let room
  try {
    room = await getRoomById(id)
  } catch (error) {
    res.status(500).send(String(error))
    return
  }

  if (room === null) {
    res
      .status(404)
      .send('Room not found. Please check the room ID and try again.')
    return
  }

  try {
    const { name, price, beds, description } = req.body

    room.name = name || room.name
    room.price = price || room.price
    room.beds = beds || room.beds
    room.description = description || room.description

    await room.save()
    res.json(room)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)

  let room
  try {
    room = await getRoomById(id)
    if (room !== null) {
      await room.destroy()
    }
    res.sendStatus(204)
  } catch (error) {
    res.status(500).send(String(error))
  }
})

export default router
