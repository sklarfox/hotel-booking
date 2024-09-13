import fetch from 'node-fetch'

export const getWeatherAtCheckIn = async (lat, lon, checkInDate) => {
  const response = await fetch(`https://api.weather.gov/points/${lat},${lon}`, {
    headers: {
      'User-Agent': process.env.WEATHER_API_KEY || 'MyWeatherApp',
      'Content-Type': 'application/ld+json',
    },
  })

  const data = await response.json()
  const forecastUrl = data.properties.forecast

  const forecastResponse = await fetch(forecastUrl, {
    headers: {
      'User-Agent': process.env.WEATHER_API_KEY || 'MyWeatherApp',
      'Content-Type': 'application/ld+json',
    },
  })

  let weatherData = await forecastResponse.json()

  weatherData = weatherData.properties.periods.filter(
    period => period.isDaytime,
  )

  return weatherData.find(day => day.startTime.split('T')[0] === checkInDate)
}
