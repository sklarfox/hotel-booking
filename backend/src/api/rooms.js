import express from 'express'
import { Room } from '../models/schema.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const rooms = await Room.findAll()
  res.json(rooms)
})

router.post('/', async (req, res, next) => {
  const { name, price, beds, description } = req.body

  if ((!name, !price, !beds)) {
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

router.put('/:id', (req, res) => {
  // TODO update room
  res.send(204)
})

router.delete('/:id', (req, res) => {
  // TODO delete room
  res.send(204)
})

export default router
