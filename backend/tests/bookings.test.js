import request from 'supertest'
import express from 'express'
import bookingsRouter from '../src/api/bookings.js'
import {
  findAvailableRoomsByDateRange,
  checkRoomAvailability,
} from '../src/services/databaseService.js'
import { Booking } from '../src/models/schema.js'
import { testRooms, testBookings } from './testData.js'
import { getBookingById } from '../src/services/databaseService.js'

jest.mock('../src/services/databaseService.js')
jest.mock('../src/models/schema.js')
jest.mock('../src/middleware/authorization.js', () => ({
  checkRole: () => (req, res, next) => next(),
}))

const app = express()
app.use(express.json())
app.use('/bookings', bookingsRouter)

beforeEach(() => {
  Booking.findAll.mockResolvedValue(testBookings)
  getBookingById.mockResolvedValue({
    id: 1,
    roomId: 1,
    clientEmail: 'hello@hello.hello',
    checkInDate: '2024-11-05',
    checkOutDate: '2024-11-06',
    save: () => {},
    destroy: () => {},
  })
})

describe('GET /bookings', () => {
  it('should return a list of all bookings', async () => {
    const response = await request(app).get('/bookings')
    expect(response.status).toBe(200)
    expect(response.body).toEqual(testBookings)
  })
  it('should return an empty array if no bookings are found', async () => {
    Booking.findAll.mockResolvedValue([])
    const response = await request(app).get('/bookings')
    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
  })
})

describe('GET /bookings/:id', () => {
  it('should return the requested booking', async () => {
    const response = await request(app).get('/bookings/1')
    expect(response.status).toBe(200)
    expect(response.body.roomId).toBe(1)
  })

  it('should provide a 404 status if the booking is not found', async () => {
    getBookingById.mockResolvedValue(null)
    const response = await request(app).get('/bookings/999')
    expect(response.status).toBe(404)
    expect(response.text).toBe(
      'Booking not found. Please check the booking ID and try again.',
    )
  })

  it('should provide a 500 status if there is a database error', async () => {
    getBookingById.mockRejectedValue(new Error('Database error'))
    const response = await request(app).get('/bookings/1')
    expect(response.status).toBe(500)
    expect(response.text).toBe('Error: Database error')
  })
})

describe('POST /bookings', () => {
  it('should accept a valid booking with no conflicting bookings', async () => {
    const newBooking = {
      roomId: 1,
      clientEmail: 'hello@hello.hello',
      checkInDate: '2024-11-05',
      checkOutDate: '2024-11-06',
    }
    Booking.create.mockResolvedValue({ dataValues: { id: 4, ...newBooking } })
    checkRoomAvailability.mockResolvedValue(true)
    findAvailableRoomsByDateRange.mockResolvedValue([testRooms[0]])

    const response = await request(app).post('/bookings').send(newBooking)

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      id: 4,
      ...newBooking,
    })
  })

  it('should reject a booking if there are any missing fields in the request', async () => {
    const invalidBooking = {
      roomId: 1,
      clientEmail: 'hello@hello.hello',
      checkInDate: '2024-11-05',
    }

    const response = await request(app).post('/bookings').send(invalidBooking)

    expect(response.status).toBe(400)
  })

  it('should reject a booking if the requested room does not exist', async () => {
    const newBooking = {
      roomId: 999,
      clientEmail: 'hello@hello.hello',
      checkInDate: '2024-11-05',
      checkOutDate: '2024-11-06',
    }

    checkRoomAvailability.mockResolvedValue(false)

    const response = await request(app).post('/bookings').send(newBooking)

    expect(response.status).toBe(400)
  })

  it('should reject a booking if the requested room is not available', async () => {
    const newBooking = {
      roomId: 999,
      clientEmail: 'hello@hello.hello',
      checkInDate: '2024-11-05',
      checkOutDate: '2024-11-06',
    }

    checkRoomAvailability.mockResolvedValue(false)

    const response = await request(app).post('/bookings').send(newBooking)

    expect(response.status).toBe(400)
  })

  it('should reject a booking if the requested dates are invalid', async () => {
    const newBooking = {
      roomId: 1,
      clientEmail: 'hello@hello.hello',
      checkInDate: '2024-11-06',
      checkOutDate: '2024-11-05',
    }

    const response = await request(app).post('/bookings').send(newBooking)

    expect(response.status).toBe(400)
  })
})

describe('PATCH /bookings/:id', () => {
  it('should accept a valid change request', async () => {
    const changeRequest = {
      checkInDate: '2024-11-06',
      checkOutDate: '2024-11-07',
    }

    checkRoomAvailability.mockResolvedValue(true)
    const response = await request(app).patch('/bookings/1').send(changeRequest)
    expect(response.status).toBe(200)
  })

  it('should reject a change request where the new dates are unavailable', async () => {
    const changeRequest = {
      checkInDate: '2024-11-06',
      checkOutDate: '2024-11-07',
    }

    checkRoomAvailability.mockResolvedValue(false)
    const response = await request(app).patch('/bookings/1').send(changeRequest)
    expect(response.status).toBe(400)
  })

  it('should provide a 404 status if the requested booking is not found', async () => {
    getBookingById.mockResolvedValue(null)
    const response = await request(app).patch('/bookings/999').send({
      checkInDate: '2024-11-06',
      checkOutDate: '2024-11-07',
    })
    expect(response.status).toBe(404)
  })
})

describe('DELETE /bookings/:id', () => {
  it('should successfully delete a valid booking', async () => {
    const response = await request(app).delete('/bookings/1')
    expect(response.status).toBe(204)
  })

  it('should provide a 204 status if the booking is not found', async () => {
    getBookingById.mockResolvedValue(null)
    const response = await request(app).delete('/bookings/999')
    expect(response.status).toBe(204)
  })
})
