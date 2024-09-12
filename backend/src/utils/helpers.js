export const validBookingDates = (reqCheckIn, reqCheckOut) => {
  let today = new Date()
  today = new Date(today.getFullYear(), today.getMonth(), today.getDay())
  const checkInDate = new Date(reqCheckIn)
  const checkOutDate = new Date(reqCheckOut)

  if (
    Number.isNaN(checkInDate.getTime()) ||
    Number.isNaN(checkOutDate.getTime())
  ) {
    return false
  }
  const isInFuture = checkInDate >= today
  const minimumOneDay = checkOutDate > checkInDate
  return isInFuture && minimumOneDay
}
