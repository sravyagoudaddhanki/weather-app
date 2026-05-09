// components/Loader.jsx
// A simple animated loading spinner shown while fetching weather data.
// Pure CSS animation — no external libraries needed!

import React from 'react'

function Loader() {
  return (
    <div className="loader-container" role="status" aria-label="Loading weather data">
      {/* Outer spinning ring */}
      <div className="loader-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="loader-text">Fetching weather...</p>
    </div>
  )
}

export default Loader
