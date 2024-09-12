const dateToFormattedString = (date: Date) => {
  const year = date.getFullYear()
  let month: number | string = date.getMonth() + 1
  month = month < 10 ? `0${month}` : month
  let day: number | string = date.getDate()
  day = day < 10 ? `0${day}` : day
  return `${year}-${month}-${day}`
}

export const searchAvailableRooms = async (checkIn: Date, checkOut: Date) => {
  const fmtCheckIn = dateToFormattedString(checkIn)
  const fmtCheckOut = dateToFormattedString(checkOut)
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL +
        'rooms' +
        `/?checkInDate=${fmtCheckIn}&checkOutDate=${fmtCheckOut}`,
    )
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    return console.error('Error fetching rooms:', error)
  }
}

export const bookRoom = () => {}

export const deleteRoom = () => {}

export const editRoom = () => {}
