import { Room, Booking } from '../models/schema.js'

export const getRoomById = async id => {
  if (Number.isNaN(id)) {
    throw new Error('Invalid room id.')
  }
  if (!(typeof id === 'number')) {
    throw new Error('Invalid parameter. Convert id to a number.')
  }

  return await Room.findByPk(id)
}

export const getBookingById = async id => {
  if (Number.isNaN(id)) {
    throw new Error('Invalid room id.')
  }
  if (!(typeof id === 'number')) {
    throw new Error('Invalid parameter. Convert id to a number.')
  }

  return await Booking.findByPk(id)
}
