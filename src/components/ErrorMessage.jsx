// components/ErrorMessage.jsx
// Displays a friendly error banner when something goes wrong
// (city not found, bad API key, network error, etc.)

import React from 'react'

// Props:
//   message — string describing what went wrong
function ErrorMessage({ message }) {
  return (
    <div className="error-box" role="alert">
      {/* Warning icon */}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="error-icon">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <p className="error-text">{message}</p>
    </div>
  )
}

export default ErrorMessage
