import express from 'express'
import { Room } from '../models/schema.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const rooms = await Room.findAll()
  res.json(rooms)
})

router.post('/', async (req, res) => {
  const newRoom = await Room.create({ price: 10000, beds: 2 })
  res.json(newRoom.dataValues)
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
