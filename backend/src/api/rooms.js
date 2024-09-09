import express from 'express'
import { Room } from '../models/schema.js'
import { getRoomById } from '../utils/helpers.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const rooms = await Room.findAll()

  res.json(rooms)
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

  if (!name || !price || !beds) {
    res
      .status(400)
      .send(
        'Error: Missing required information. Please verify all required fields and try again.',
      )
    return
  }

  try {
    const newRoom = await Room.create({ name, price, beds, description })
    res.json(newRoom.dataValues)
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
    res.status(400).send(String(error))
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
  } catch (error) {
    res.status(400).send(String(error))
  }

  if (room !== null) {
    room.destroy()
  }
  res.send(204)
})

export default router
