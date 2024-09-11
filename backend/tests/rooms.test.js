import request from 'supertest'
import express from 'express'
import roomsRouter from '../src/api/rooms.js'
import {
  findAvailableRoomsByDateRange,
  getRoomById,
} from '../src/services/databaseService.js'
import { Room } from '../src/models/schema.js'
import { testRooms, testBookings } from './testData.js'
import { checkRole } from '../src/middleware/authorization.js'

jest.mock('../src/services/databaseService.js')
jest.mock('../src/models/schema.js')
jest.mock('../src/middleware/authorization.js', () => ({
  checkRole: () => (req, res, next) => next(),
}))

const app = express()
app.use(express.json())
app.use('/rooms', roomsRouter)

beforeEach(() => {
  Room.findAll.mockResolvedValue(testRooms)
  Room.findByPk.mockResolvedValue(testRooms[0])
  findAvailableRoomsByDateRange.mockResolvedValue(testRooms)
  getRoomById.mockResolvedValue({
    id: 1,
    name: 'Deluxe Double Room',
    price: 20999,
    description: 'A room',
    save: () => {},
    destroy: () => {},
  })
})

describe('GET /rooms', () => {
  it('should return a list of rooms if provided no query', async () => {
    const response = await request(app).get('/rooms')
    expect(response.status).toBe(200)
    expect(response.body).toEqual(testRooms)
  })

  it('should return a list of available rooms if provided with a valid query', async () => {
    const response = await request(app)
      .get('/rooms')
      .query({ checkInDate: '2025-02-06', checkOutDate: '2025-02-07' })
    expect(response.status).toBe(200)
  })

  it('should reject a request when provided a query without a check in date', async () => {
    const response = await request(app)
      .get('/rooms')
      .query({ checkOutDate: '2025-02-07' })
    expect(response.status).toBe(400)
  })

  it('should reject a request when provided a query without a check out date', async () => {
    const response = await request(app)
      .get('/rooms')
      .query({ checkInDate: '2025-02-07' })
    expect(response.status).toBe(400)
  })

  it('should reject a request when provided a query with invalid dates', async () => {
    const response = await request(app)
      .get('/rooms')
      .query({ checkInDate: '2025-02-07', checkOutDate: '2025-02-06' })
    expect(response.status).toBe(400)
  })

  it('should reject a request when provided a query with past dates', async () => {
    const response = await request(app)
      .get('/rooms')
      .query({ checkInDate: '2010-02-07', checkOutDate: '2010-02-06' })
    expect(response.status).toBe(400)
  })

  it('should return a 500 status code if database call fails', async () => {
    Room.findAll.mockRejectedValue(new Error('Database error'))
    const response = await request(app).get('/rooms')

    expect(response.status).toBe(500)
    expect(response.body).toEqual({})
    expect(Room.findAll).toHaveBeenCalledTimes(2)
  })
})

describe('GET /rooms/:id', () => {
  it('should provide the requested room', async () => {
    getRoomById.mockResolvedValue(testRooms[0])
    const response = await request(app).get('/rooms/1')
    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual(testRooms[0])
  })

  it('should provide a 404 status code if the room is not found', async () => {
    getRoomById.mockResolvedValue(null)
    const response = await request(app).get('/rooms/425')
    expect(response.status).toBe(404)
  })

  it('should provide a 400 status code if the requested room is invalid', async () => {
    getRoomById.mockRejectedValue(new Error('Validation Error'))
    const response = await request(app).get('/rooms/asdf')
    expect(response.status).toBe(400)
  })
})

describe('POST /rooms', () => {
  it('should return the room information on successful creation', async () => {
    Room.create.mockResolvedValue({
      id: 1,
      name: 'Single Room',
      beds: 1,
      price: 8999,
    })
    const response = await request(app)
      .post('/rooms')
      .send({ name: 'Single Room', beds: 1, price: 8999 })

    expect(response.status).toBe(201)
  })

  it('should reject request with missing data fields', async () => {
    const response = await request(app)
      .post('/rooms')
      .send({ beds: 1, price: 8999 })

    expect(response.status).toBe(400)
  })

  describe('PATCH /rooms', () => {
    it('should update the room and return the new data', async () => {
      const response = await request(app)
        .patch('/rooms/1')
        .send({ price: 10999 })
      expect(response.status).toBe(200)
    })

    it('should provide a 404 error if the room does not exist', async () => {
      getRoomById.mockResolvedValue(null)
      const response = await request(app)
        .patch('/rooms/9999')
        .send({ price: 10999 })
      expect(response.status).toBe(404)
    })
  })

  describe('DELETE /rooms/:id', () => {
    it('should provide a 204 response code', async () => {
      const response = await request(app).delete('/rooms/1')
      expect(response.status).toBe(204)
    })
  })
})
