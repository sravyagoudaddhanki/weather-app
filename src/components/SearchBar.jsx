// components/SearchBar.jsx
// The search input at the top of the app.
// Handles text input, Enter key press, and the "Use My Location" button.

import React, { useState } from 'react'

// Props received from App.jsx:
//   onSearch      — function to call when user searches a city
//   onGeolocate   — function to call when user clicks location button
//   darkMode      — boolean for theme styling
function SearchBar({ onSearch, onGeolocate, darkMode }) {
  // Local state: tracks what the user is typing in the input box
  const [inputValue, setInputValue] = useState('')

  // Called when user clicks Search or presses Enter
  const handleSubmit = () => {
    if (inputValue.trim()) {
      onSearch(inputValue.trim())  // pass city name up to App
    }
  }

  // Listens for "Enter" key press inside the input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="search-bar">
      {/* Text input for city name */}
      <div className="search-input-wrapper">
        {/* Search icon (SVG) */}
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          type="text"
          placeholder="Search city..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}  // update state as user types
          onKeyDown={handleKeyDown}                          // detect Enter key
          className="search-input"
          aria-label="Search for a city"
          autoComplete="off"
        />

        {/* Clear button — only shows when there's text */}
        {inputValue && (
          <button
            className="clear-btn"
            onClick={() => setInputValue('')}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* Search button */}
      <button className="search-btn" onClick={handleSubmit} aria-label="Search">
        Search
      </button>

      {/* Location button — uses browser's Geolocation API */}
      <button
        className="location-btn"
        onClick={onGeolocate}
        title="Use my current location"
        aria-label="Use my location"
      >
        {/* Location pin SVG icon */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        </svg>
      </button>
    </div>
  )
}

export default SearchBar
