// hooks/useWeather.js
// Custom React hook that handles all weather data fetching logic.
// Keeping fetch logic here (separate from UI) is a good practice called
// "separation of concerns" — it keeps our components clean.

import { useState, useCallback } from 'react'

// Your API key is read from the .env file (VITE_ prefix exposes it to the browser)
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export function useWeather() {
  // State variables — React re-renders the UI whenever these change
  const [weather, setWeather]       = useState(null)   // current weather data
  const [forecast, setForecast]     = useState(null)   // 5-day forecast data
  const [airQuality, setAirQuality] = useState(null)   // air quality data
  const [loading, setLoading]       = useState(false)  // show/hide spinner
  const [error, setError]           = useState('')     // error message string

  // --- fetchWeather ---
  // useCallback prevents this function from being recreated on every render
  const fetchWeather = useCallback(async (city) => {
    if (!city.trim()) return  // do nothing if search is empty

    setLoading(true)   // show spinner
    setError('')       // clear any old errors
    setWeather(null)   // clear old weather
    setForecast(null)
    setAirQuality(null)

    try {
      // --- Step 1: Fetch current weather ---
      const weatherRes = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      )

      // If city not found, OpenWeather returns HTTP 404
      if (!weatherRes.ok) {
        if (weatherRes.status === 404) {
          throw new Error(`City "${city}" not found. Please check the spelling.`)
        } else if (weatherRes.status === 401) {
          throw new Error('Invalid API key. Check your .env file.')
        } else {
          throw new Error('Something went wrong. Please try again.')
        }
      }

      const weatherData = await weatherRes.json()
      setWeather(weatherData)

      // --- Step 2: Fetch 5-day / 3-hour forecast ---
      const forecastRes = await fetch(
        `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      )
      if (forecastRes.ok) {
        const forecastData = await forecastRes.json()
        setForecast(forecastData)
      }

      // --- Step 3: Fetch Air Quality (needs lat/lon from step 1) ---
      const { lat, lon } = weatherData.coord
      const aqiRes = await fetch(
        `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      )
      if (aqiRes.ok) {
        const aqiData = await aqiRes.json()
        setAirQuality(aqiData)
      }

    } catch (err) {
      // Show user-friendly error message
      setError(err.message)
    } finally {
      // Always hide spinner when done, success or error
      setLoading(false)
    }
  }, [])

  // --- fetchByCoords ---
  // Used for "Use My Location" button — takes lat/lon instead of city name
  const fetchByCoords = useCallback(async (lat, lon) => {
    setLoading(true)
    setError('')
    setWeather(null)
    setForecast(null)
    setAirQuality(null)

    try {
      const weatherRes = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      )
      if (!weatherRes.ok) throw new Error('Could not fetch weather for your location.')

      const weatherData = await weatherRes.json()
      setWeather(weatherData)

      const forecastRes = await fetch(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      )
      if (forecastRes.ok) {
        const forecastData = await forecastRes.json()
        setForecast(forecastData)
      }

      const aqiRes = await fetch(
        `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      )
      if (aqiRes.ok) {
        const aqiData = await aqiRes.json()
        setAirQuality(aqiData)
      }

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  // Return everything the components need
  return { weather, forecast, airQuality, loading, error, fetchWeather, fetchByCoords }
}
