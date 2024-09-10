import request from 'supertest'
import express from 'express'
import roomsRouter from '../src/api/rooms.js'
import { findAvailableRoomsByDateRange } from '../src/services/databaseService.js'
import { Room } from '../src/models/schema.js'
import { testRooms, testBookings } from './testData.js'

jest.mock('../src/services/databaseService.js')
jest.mock('../src/models/schema.js')

const app = express()
app.use(express.json())
app.use('/rooms', roomsRouter)

beforeEach(() => {
  Room.findAll.mockResolvedValue(testRooms)
  findAvailableRoomsByDateRange.mockResolvedValue(testRooms)
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
    console.log('rejecting')

    expect(response.status).toBe(500)
    expect(response.body).toEqual({})
    expect(Room.findAll).toHaveBeenCalledTimes(2)
  })
})
