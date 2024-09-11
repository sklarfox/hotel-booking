export const getTomorrow = (date: Date): Date => {
  const tomorrow = new Date(date)
  tomorrow.setDate(date.getDate() + 1)
  return tomorrow
}
