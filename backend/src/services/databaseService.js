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
        { roomId: roomId },
        { checkInDate: { [Op.lt]: reqCheckOutDate } },
        { checkOutDate: { [Op.gt]: reqCheckInDate } },
      ],
    },
  })

  return !booking
}

export const findAvailableRoomsByDateRange = async (
  reqCheckInDate,
  reqCheckOutDate,
) => {
  const rooms = await Room.findAll({
    include: {
      model: Booking,
      required: false,
      where: {
        [Op.and]: [
          { checkInDate: { [Op.lt]: reqCheckOutDate } },
          { checkOutDate: { [Op.gt]: reqCheckInDate } },
        ],
      },
    },
  })

  console.log(rooms)
  return rooms
}
