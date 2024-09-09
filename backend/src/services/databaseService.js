import { Op } from 'sequelize'
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

export const checkRoomAvailability = async (
  roomId,
  reqCheckInDate,
  reqCheckOutDate,
) => {
  const booking = await Booking.findOne({
    where: {
      [Op.and]: [
        { room_id: roomId },
        { check_in_date: { [Op.lt]: reqCheckOutDate } },
        { check_out_date: { [Op.gt]: reqCheckInDate } },
      ],
    },
  })

  return !booking
}
