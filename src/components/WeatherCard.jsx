// components/WeatherCard.jsx
// The main card showing current weather conditions.
// Displays: city, temperature, condition, humidity, wind, sunrise/sunset, and more.

import React from 'react'

// Helper: format a Unix timestamp into a readable time string
// Unix timestamps are seconds since Jan 1, 1970 — multiply by 1000 for JS Date
function formatTime(unixTimestamp, timezoneOffset) {
  // Convert UTC timestamp + city's UTC offset → local time
  const date = new Date((unixTimestamp + timezoneOffset) * 1000)
  return date.toUTCString().slice(17, 22)  // extract HH:MM
}

// Helper: format today's date nicely
function formatDate() {
  const now = new Date()
  return now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

// Helper: map AQI index (1–5) to a label and CSS class
function getAQIInfo(aqi) {
  const levels = {
    1: { label: 'Good',        cls: 'aqi-good' },
    2: { label: 'Fair',        cls: 'aqi-fair' },
    3: { label: 'Moderate',    cls: 'aqi-moderate' },
    4: { label: 'Poor',        cls: 'aqi-poor' },
    5: { label: 'Very Poor',   cls: 'aqi-verypoor' },
  }
  return levels[aqi] || { label: 'Unknown', cls: '' }
}

// Props:
//   weather    — current weather JSON from OpenWeatherMap
//   airQuality — air quality JSON from OpenWeatherMap
function WeatherCard({ weather, airQuality }) {
  // Destructure the data we need from the API response
  const {
    name,                            // city name e.g. "London"
    sys: { country, sunrise, sunset }, // country code, sunrise/sunset Unix timestamps
    main: { temp, feels_like, humidity, pressure }, // temperature stats
    weather: [{ description, icon }], // condition text and icon code
    wind: { speed },                 // wind speed in m/s
    visibility,                      // visibility in metres
    timezone,                        // UTC offset in seconds
  } = weather

  // Build the weather icon URL from OpenWeatherMap's CDN
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`

  // Get AQI info if available
  const aqiValue = airQuality?.list?.[0]?.main?.aqi
  const aqiInfo  = aqiValue ? getAQIInfo(aqiValue) : null

  // Capitalise the first letter of each word in the description
  const conditionLabel = description
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <div className="weather-card" role="main">

      {/* ── Top: City & Date ── */}
      <div className="card-header">
        <div className="city-info">
          <h2 className="city-name">
            {name}
            <span className="country-badge">{country}</span>
          </h2>
          <p className="date-text">{formatDate()}</p>
        </div>

        {/* Weather icon from OpenWeatherMap */}
        <div className="weather-icon-wrapper">
          <img
            src={iconUrl}
            alt={conditionLabel}
            className="weather-icon"
          />
        </div>
      </div>

      {/* ── Temperature & Condition ── */}
      <div className="temp-section">
        <div className="temperature">
          {Math.round(temp)}
          <span className="degree-symbol">°C</span>
        </div>
        <p className="condition-text">{conditionLabel}</p>
        <p className="feels-like">Feels like {Math.round(feels_like)}°C</p>
      </div>

      {/* ── Stats Grid: Humidity, Wind, Pressure, Visibility ── */}
      <div className="stats-grid">

        {/* Humidity */}
        <div className="stat-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stat-icon">
            <path d="M12 2C6 8 4 12 4 15a8 8 0 0016 0c0-3-2-7-8-13z" />
          </svg>
          <span className="stat-value">{humidity}%</span>
          <span className="stat-label">Humidity</span>
        </div>

        {/* Wind Speed */}
        <div className="stat-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stat-icon">
            <path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
          </svg>
          <span className="stat-value">{speed} m/s</span>
          <span className="stat-label">Wind</span>
        </div>

        {/* Pressure */}
        <div className="stat-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stat-icon">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="stat-value">{pressure} hPa</span>
          <span className="stat-label">Pressure</span>
        </div>

        {/* Visibility */}
        <div className="stat-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stat-icon">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <span className="stat-value">{(visibility / 1000).toFixed(1)} km</span>
          <span className="stat-label">Visibility</span>
        </div>
      </div>

      {/* ── Sunrise & Sunset ── */}
      <div className="sun-times">
        <div className="sun-item">
          {/* Sunrise icon */}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sun-icon">
            <path d="M12 2v4M4.22 10.22l2.83 2.83M2 18h4M18 18h4M16.95 13.05l2.83-2.83M12 6a6 6 0 100 12 6 6 0 000-12zM2 22h20" />
          </svg>
          <div>
            <span className="sun-label">Sunrise</span>
            <span className="sun-time">{formatTime(sunrise, timezone)}</span>
          </div>
        </div>

        <div className="sun-divider" />

        <div className="sun-item">
          {/* Sunset icon */}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sun-icon">
            <path d="M12 10v4M4.22 17.78l2.83-2.83M2 6h4M18 6h4M16.95 14.95l2.83 2.83M12 14a6 6 0 100-12 6 6 0 000 12zM2 22h20" />
          </svg>
          <div>
            <span className="sun-label">Sunset</span>
            <span className="sun-time">{formatTime(sunset, timezone)}</span>
          </div>
        </div>
      </div>

      {/* ── Air Quality Index ── */}
      {aqiInfo && (
        <div className={`aqi-badge ${aqiInfo.cls}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Air Quality: <strong>{aqiInfo.label}</strong>
        </div>
      )}
    </div>
  )
}

export default WeatherCard
