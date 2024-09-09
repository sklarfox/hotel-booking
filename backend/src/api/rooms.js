import express from 'express'
import { Room } from '../models/schema.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const rooms = await Room.findAll()

  res.json(rooms)
})

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)

  if (Number.isNaN(id)) {
    res
      .status(400)
      .send('Error: Bad room ID. Please check the room ID and try again.')
    return
  }
  const room = await Room.findByPk(id)

  if (room === null) {
    res
      .status(404)
      .send('Room not found. Please check the room ID and try again.')
    return
  }
  res.json(room)
})

router.post('/', async (req, res, next) => {
  const { name, price, beds, description } = req.body

  if (!name || !price || !beds) {
    res
      .status(400)
      .send(
        'Error: Missing required information. Please verify all required fields and try again.',
      )
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

  if (Number.isNaN(id)) {
    res
      .status(400)
      .send('Error: Bad room ID. Please check the room ID and try again.')
    return
  }

  const room = await Room.findByPk(id)

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
  // TODO delete room
  res.send(204)
})

export default router
