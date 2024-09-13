import fetch from 'node-fetch'
import NodeCache from 'node-cache'

const cache = new NodeCache({ stdTTL: 60 * 60 })

export const getWeatherAtCheckIn = async (lat, lon, checkInDate) => {
  const cacheKey = `${lat},${lon}`
  let fullForecast = cache.get(cacheKey)

  if (fullForecast === undefined) {
    const response = await fetch(
      `https://api.weather.gov/points/${lat},${lon}`,
      {
        headers: {
          'User-Agent': process.env.WEATHER_API_KEY || 'MyWeatherApp',
          'Content-Type': 'application/ld+json',
        },
      },
    )

    const data = await response.json()
    const forecastUrl = data.properties.forecast

    const forecastResponse = await fetch(forecastUrl, {
      headers: {
        'User-Agent': process.env.WEATHER_API_KEY || 'MyWeatherApp',
        'Content-Type': 'application/ld+json',
      },
    })

    fullForecast = await forecastResponse.json()
    fullForecast = fullForecast.properties.periods.filter(
      period => period.isDaytime,
    )

    cache.set(cacheKey, fullForecast)
  }

  return fullForecast.find(day => day.startTime.split('T')[0] === checkInDate)
}
