export const testRooms = [
  {
    id: 1,
    name: 'Deluxe Suite',
    price: 20999,
    beds: 3,
    description: 'The presidential suite with ocean views.',
    createdAt: '2024-09-09T23:25:48.752Z',
    updatedAt: '2024-09-09T23:25:48.752Z',
  },
  {
    id: 2,
    name: 'Deluxe Double Room',
    price: 14999,
    beds: 2,
    description: 'Two queen beds with ensuite.',
    createdAt: '2024-09-09T23:25:48.752Z',
    updatedAt: '2024-09-09T23:25:48.752Z',
  },
  {
    id: 3,
    name: 'Ultra Budget',
    price: 8999,
    beds: 1,
    description: 'An air mattress in the corner of the broom closet.',
    createdAt: '2024-09-10T01:37:20.215Z',
    updatedAt: '2024-09-10T01:37:20.215Z',
  },
]

export const testBookings = [
  {
    id: 1,
    clientEmail: 'johnny.utah@point.break',
    checkInDate: '2024-10-01',
    checkOutDate: '2024-10-03',
    createdAt: '2024-09-10T01:30:06.785Z',
    updatedAt: '2024-09-10T01:30:06.785Z',
    roomId: 1,
  },
  {
    id: 2,
    clientEmail: 'hello@hello.hello',
    checkInDate: '2024-10-05',
    checkOutDate: '2024-10-06',
    createdAt: '2024-09-10T01:40:28.211Z',
    updatedAt: '2024-09-10T01:40:28.211Z',
    roomId: 1,
  },
  {
    id: 3,
    clientEmail: 'user@user.com',
    checkInDate: '2024-10-05',
    checkOutDate: '2024-10-06',
    createdAt: '2024-09-10T01:40:28.211Z',
    updatedAt: '2024-09-10T01:40:28.211Z',
    roomId: 2,
  },
]

export const mockWeather = {
  number: 5,
  name: 'Sunday',
  startTime: '2024-09-15T06:00:00-04:00',
  endTime: '2024-09-15T18:00:00-04:00',
  isDaytime: true,
  temperature: 76,
  temperatureUnit: 'F',
  temperatureTrend: '',
  probabilityOfPrecipitation: {
    unitCode: 'wmoUnit:percent',
    value: null,
  },
  windSpeed: '6 to 13 mph',
  windDirection: 'E',
  icon: 'https://api.weather.gov/icons/land/day/few?size=medium',
  shortForecast: 'Sunny',
  detailedForecast: 'Sunny, with a high near 76. East wind 6 to 13 mph.',
}
