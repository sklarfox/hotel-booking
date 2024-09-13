import axios from 'axios'
import NodeCache from 'node-cache'

const cache = new NodeCache({ stdTTL: 60 * 60 })

class HTTPResponseError extends Error {
  constructor(response) {
    super(`HTTP Error Response: ${response.status} ${response.statusText}`)
    this.response = response
  }
}

const callWeatherAPI = async (lat, lon) => {
  let pointsResponse
  try {
    pointsResponse = await axios.get(
      `https://api.weather.gov/points/${lat},${lon}`,
      {
        headers: {
          'User-Agent': process.env.WEATHER_API_KEY || 'MyWeatherApp',
          'Content-Type': 'application/ld+json',
        },
      },
    )

    if (!(pointsResponse.status >= 200 || pointsResponse.status <= 300)) {
      throw new HTTPResponseError(pointsResponse)
    }
  } catch (error) {
    console.error(error)
    return undefined
  }

  const data = pointsResponse.data
  const forecastUrl = data.properties.forecast

  let forecastResponse
  try {
    forecastResponse = await axios.get(forecastUrl, {
      headers: {
        'User-Agent': process.env.WEATHER_API_KEY || 'MyWeatherApp',
        'Content-Type': 'application/ld+json',
      },
    })

    if (!(pointsResponse.status >= 200 || pointsResponse.status <= 300)) {
      throw new HTTPResponseError(forecastResponse)
    }
  } catch (error) {
    console.error(error)
    return undefined
  }

  const fullForecast = forecastResponse.data
  return fullForecast.properties.periods.filter(period => period.isDaytime)
}

export const getWeatherAtCheckIn = async (lat, lon, checkInDate) => {
  const cacheKey = `${lat},${lon}`
  let fullForecast = cache.get(cacheKey)

  if (fullForecast === undefined) {
    try {
      fullForecast = await callWeatherAPI(lat, lon)
      if (fullForecast) {
        cache.set(cacheKey, fullForecast)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return fullForecast?.find(day => day.startTime.split('T')[0] === checkInDate)
}
