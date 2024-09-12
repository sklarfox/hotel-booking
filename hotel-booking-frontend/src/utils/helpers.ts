export const getTomorrow = (date: Date): Date => {
  const tomorrow = new Date(date)
  tomorrow.setDate(date.getDate() + 1)
  return tomorrow
}

export const getYesterday = (date: Date): Date => {
  const yesterday = new Date(date)
  yesterday.setDate(date.getDate() - 1)
  return yesterday
}

export const getDateAlert = (checkInDate: Date, checkOutDate: Date) => {
  if (checkInDate >= checkOutDate) {
    return 'Check-out date must be one day or more after check-in date'
  } else if (checkInDate <= getYesterday(new Date())) {
    return 'Check-in date must be today or later'
  }
  return ''
}

export function getNumberOfNights(checkIn: Date, checkOut: Date): number {
  const oneDay = 24 * 60 * 60 * 1000 // milliseconds in one day
  const diffInTime = checkOut.getTime() - checkIn.getTime()
  const diffInDays = diffInTime / oneDay
  return Math.round(diffInDays)
}
