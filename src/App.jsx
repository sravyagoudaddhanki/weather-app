// App.jsx — The root component of our Weather App
//
// This component:
//   - Holds top-level state (dark mode, last city searched)
//   - Uses our custom useWeather hook to fetch weather data
//   - Picks a dynamic background based on the current weather condition
//   - Renders all child components (SearchBar, WeatherCard, etc.)

import React, { useState, useEffect } from 'react'
import SearchBar    from './components/SearchBar.jsx'
import WeatherCard  from './components/WeatherCard.jsx'
import ForecastCard from './components/ForecastCard.jsx'
import Loader       from './components/Loader.jsx'
import ErrorMessage from './components/ErrorMessage.jsx'
import { useWeather } from './hooks/useWeather.js'

// Maps OpenWeatherMap "main" condition strings to CSS class names
// These classes control the animated gradient background in App.css
function getBgClass(weatherMain) {
  const map = {
    Clear:        'bg-clear',
    Clouds:       'bg-clouds',
    Rain:         'bg-rain',
    Drizzle:      'bg-rain',
    Thunderstorm: 'bg-storm',
    Snow:         'bg-snow',
    Mist:         'bg-mist',
    Fog:          'bg-mist',
    Haze:         'bg-mist',
    Smoke:        'bg-mist',
    Dust:         'bg-mist',
    Sand:         'bg-mist',
  }
  return map[weatherMain] || 'bg-default'
}

function App() {
  // Dark mode state — saved in localStorage so it persists between visits
  const [darkMode, setDarkMode] = useState(() => {
    // Read saved preference on first load; default to false
    return localStorage.getItem('darkMode') === 'true'
  })

  // Save dark mode preference whenever it changes
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  // Our custom hook — gives us weather data + fetch functions
  const {
    weather,
    forecast,
    airQuality,
    loading,
    error,
    fetchWeather,
    fetchByCoords,
  } = useWeather()

  // Determine which background class to apply (changes with weather)
  const bgClass = weather ? getBgClass(weather.weather[0].main) : 'bg-default'

  // --- Handle Geolocation ---
  // Called when user clicks the location button in SearchBar
  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.')
      return
    }

    // Ask browser for user's coordinates
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        fetchByCoords(latitude, longitude)
      },
      (err) => {
        alert('Could not get your location. Please allow location access.')
      }
    )
  }

  return (
    // Apply dark-mode class and dynamic weather background class to root div
    <div className={`app ${darkMode ? 'dark' : ''} ${bgClass}`}>

      {/* Animated background blobs */}
      <div className="bg-blob blob-1" />
      <div className="bg-blob blob-2" />
      <div className="bg-blob blob-3" />

      {/* ── App Container ── */}
      <div className="container">

        {/* ── Header ── */}
        <header className="app-header">
          <div className="logo">
            {/* Cloud + sun SVG logo */}
            <svg viewBox="0 0 40 28" fill="none" className="logo-icon">
              <circle cx="28" cy="10" r="8" fill="currentColor" opacity="0.9" />
              <circle cx="16" cy="16" r="10" fill="currentColor" />
              <circle cx="28" cy="18" r="8" fill="currentColor" />
              <rect x="8" y="20" width="26" height="7" rx="3.5" fill="currentColor" />
            </svg>
            <span className="logo-text">Skycast</span>
          </div>

          {/* Dark mode toggle button */}
          <button
            className="dark-toggle"
            onClick={() => setDarkMode(prev => !prev)}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={darkMode ? 'Light mode' : 'Dark mode'}
          >
            {/* Show moon in light mode, sun in dark mode */}
            {darkMode ? (
              // Sun icon
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              // Moon icon
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>
        </header>

        {/* ── Search Bar ── */}
        <SearchBar
          onSearch={fetchWeather}
          onGeolocate={handleGeolocate}
          darkMode={darkMode}
        />

        {/* ── Content Area ── */}
        <main className="content">
          {/* Show spinner while loading */}
          {loading && <Loader />}

          {/* Show error if something went wrong */}
          {!loading && error && <ErrorMessage message={error} />}

          {/* Show weather results once we have data */}
          {!loading && !error && weather && (
            <>
              <WeatherCard weather={weather} airQuality={airQuality} />
              <ForecastCard forecast={forecast} />
            </>
          )}

          {/* Welcome message when no search has been made yet */}
          {!loading && !error && !weather && (
            <div className="welcome">
              <div className="welcome-icon">🌤️</div>
              <h2 className="welcome-title">Welcome to Skycast</h2>
              <p className="welcome-subtitle">
                Search for any city to see live weather conditions,<br />
                hourly forecasts, and a 5-day outlook.
              </p>
            </div>
          )}
        </main>

        {/* ── Footer ── */}
        <footer className="app-footer">
          <p>Powered by <a href="https://openweathermap.org" target="_blank" rel="noreferrer">OpenWeatherMap</a></p>
        </footer>
      </div>
    </div>
  )
}

export default App
