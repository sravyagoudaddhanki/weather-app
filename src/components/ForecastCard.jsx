// components/ForecastCard.jsx
// Shows two tabs:
//   1. Hourly — next 8 time slots (every 3 hours) for today
//   2. 5-Day  — one entry per day at midday for the next 5 days

import React, { useState } from 'react'

// Helper: get a short day name from a Unix timestamp ("Mon", "Tue" etc.)
function getDayName(unixTs) {
  return new Date(unixTs * 1000).toLocaleDateString('en-US', { weekday: 'short' })
}

// Helper: get HH:MM from a Unix timestamp
function getHour(unixTs) {
  return new Date(unixTs * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

function ForecastCard({ forecast }) {
  // Which tab is active: 'hourly' or '5day'
  const [activeTab, setActiveTab] = useState('hourly')

  if (!forecast) return null

  const allSlots = forecast.list  // 40 entries: 5 days × 8 slots/day (every 3hrs)

  // --- Hourly: take the next 8 entries (= next 24 hours) ---
  const hourlySlots = allSlots.slice(0, 8)

  // --- 5-Day: pick one slot per calendar day at closest to noon ---
  const dailyMap = {}
  allSlots.forEach(slot => {
    // "dt_txt" looks like "2024-06-10 12:00:00"
    const day = slot.dt_txt.split(' ')[0]  // get "YYYY-MM-DD"
    const hour = parseInt(slot.dt_txt.split(' ')[1])  // get HH

    // Prefer the 12:00 slot; fall back to any slot we haven't saved yet
    if (!dailyMap[day] || hour === 12) {
      dailyMap[day] = slot
    }
  })
  const dailySlots = Object.values(dailyMap).slice(0, 5)

  return (
    <div className="forecast-card">

      {/* ── Tab Switcher ── */}
      <div className="forecast-tabs">
        <button
          className={`tab-btn ${activeTab === 'hourly' ? 'active' : ''}`}
          onClick={() => setActiveTab('hourly')}
        >
          Hourly
        </button>
        <button
          className={`tab-btn ${activeTab === '5day' ? 'active' : ''}`}
          onClick={() => setActiveTab('5day')}
        >
          5-Day
        </button>
      </div>

      {/* ── Hourly Forecast ── */}
      {activeTab === 'hourly' && (
        <div className="forecast-scroll">
          {hourlySlots.map((slot) => (
            <div className="forecast-item" key={slot.dt}>
              {/* Time e.g. "14:00" */}
              <span className="forecast-time">{getHour(slot.dt)}</span>

              {/* Weather icon */}
              <img
                src={`https://openweathermap.org/img/wn/${slot.weather[0].icon}.png`}
                alt={slot.weather[0].description}
                className="forecast-icon"
              />

              {/* Temperature */}
              <span className="forecast-temp">{Math.round(slot.main.temp)}°</span>

              {/* Rain chance (pop = probability of precipitation, 0-1) */}
              {slot.pop > 0 && (
                <span className="forecast-rain">
                  💧 {Math.round(slot.pop * 100)}%
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── 5-Day Forecast ── */}
      {activeTab === '5day' && (
        <div className="forecast-scroll">
          {dailySlots.map((slot) => (
            <div className="forecast-item forecast-item--day" key={slot.dt}>
              {/* Day name e.g. "Mon" */}
              <span className="forecast-time">{getDayName(slot.dt)}</span>

              {/* Weather icon */}
              <img
                src={`https://openweathermap.org/img/wn/${slot.weather[0].icon}.png`}
                alt={slot.weather[0].description}
                className="forecast-icon"
              />

              {/* Condition label */}
              <span className="forecast-desc">
                {slot.weather[0].main}
              </span>

              {/* Min / Max temperatures */}
              <span className="forecast-temp">
                <span className="temp-max">{Math.round(slot.main.temp_max)}°</span>
                <span className="temp-min"> / {Math.round(slot.main.temp_min)}°</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ForecastCard
