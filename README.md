# 🌤️ Skycast — Weather App

A beautiful, fully-featured weather app built with **React + Vite**.  
Live weather, 5-day forecasts, hourly outlook, air quality, and more.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 City Search | Search any city in the world |
| 📍 Geolocation | One-click weather for your current location |
| 🌡️ Current Weather | Temperature, feels-like, condition, icon |
| 💨 Wind & Humidity | Wind speed, humidity, pressure, visibility |
| 🌅 Sun Times | Sunrise and sunset for the city |
| 🌬️ Air Quality | AQI index with colour-coded badge |
| ⏱️ Hourly Forecast | Next 24 hours in 3-hour slots |
| 📅 5-Day Forecast | Daily min/max + rain chance |
| 🌈 Dynamic Background | Background changes with weather condition |
| 🌙 Dark Mode | Toggled in one click, saved between visits |
| 📱 Fully Responsive | Works great on all screen sizes |
| ⌨️ Enter to Search | Press Enter — no extra clicks needed |
| ⚠️ Error Handling | Clear messages for invalid cities or API issues |

---

## 🚀 Quick Start

### Step 1 — Get a free API key

1. Go to [https://openweathermap.org/api](https://openweathermap.org/api)
2. Click **Sign Up** (free account)
3. After signing in, go to **API keys** in your profile
4. Copy your default key (or create a new one)
5. ⚠️ New keys take up to **2 hours** to activate

### Step 2 — Download & configure

```bash
# 1. Move into the project folder
cd weather-app

# 2. Copy the env example and fill in your key
cp .env.example .env
```

Open `.env` and replace the placeholder:

```
VITE_OPENWEATHER_API_KEY=paste_your_key_here
```

### Step 3 — Install dependencies

```bash
npm install
```

### Step 4 — Run the development server

```bash
npm run dev
```

Open your browser to: **http://localhost:5173**

---

## 📁 Project Structure

```
weather-app/
├── public/
│   └── weather-icon.svg         # Browser tab icon
│
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx        # Search input + location button
│   │   ├── WeatherCard.jsx      # Main current weather card
│   │   ├── ForecastCard.jsx     # Hourly + 5-day tabs
│   │   ├── Loader.jsx           # Spinning loading indicator
│   │   └── ErrorMessage.jsx     # Error banner
│   │
│   ├── hooks/
│   │   └── useWeather.js        # Custom hook — all API logic lives here
│   │
│   ├── App.jsx                  # Root component — layout + state
│   ├── App.css                  # All styles (glassmorphism, animations, dark mode)
│   └── main.jsx                 # Entry point — mounts App into the DOM
│
├── index.html                   # HTML shell (Vite injects the JS here)
├── vite.config.js               # Vite configuration
├── package.json                 # Project metadata + dependencies
├── .env                         # Your secret API key (never commit this!)
└── .env.example                 # Safe template to share
```

---

## 📜 Available Scripts

```bash
npm run dev       # Start dev server at localhost:5173 (hot reload included)
npm run build     # Build for production → output goes to /dist
npm run preview   # Preview the production build locally
```

---

## 🌍 Deploy to Vercel (free, ~2 minutes)

### Option A — Via Vercel website (easiest)

1. Push your project to **GitHub** (make sure `.env` is in `.gitignore`!)
2. Go to [https://vercel.com](https://vercel.com) and sign in with GitHub
3. Click **"Add New Project"** → select your repo
4. In the **Environment Variables** section, add:
   - Key: `VITE_OPENWEATHER_API_KEY`
   - Value: your API key
5. Click **Deploy** ✅

### Option B — Via Vercel CLI

```bash
# Install Vercel CLI once
npm install -g vercel

# Deploy from project root
vercel

# When prompted, add your env variable
# Or set it in the Vercel dashboard after deploying
```

### ⚠️ Important: Never commit your `.env` file
Your `.gitignore` already excludes it. Double-check before pushing!

---

## 🔧 API Used

**OpenWeatherMap** — [https://openweathermap.org](https://openweathermap.org)

| Endpoint | Purpose |
|---|---|
| `/data/2.5/weather` | Current conditions |
| `/data/2.5/forecast` | 5-day / 3-hour forecast |
| `/data/2.5/air_pollution` | Air quality index |

All endpoints are free with a basic account (up to 1,000 calls/day).

---

## 💡 Beginner Tips

- **useState** — stores values that change (city input, dark mode, etc.)
- **useEffect** — runs code when something changes (like saving dark mode)
- **useCallback** — prevents a function from being re-created on every render
- **async/await** — a clean way to wait for API responses without `.then()` chains
- **Custom hook** — a function starting with `use` that bundles related state + logic

---

## 🛠️ Troubleshooting

| Problem | Fix |
|---|---|
| "Invalid API key" error | Check `.env` — key must start with `VITE_`, no spaces |
| City not found | Check spelling; try English city name |
| API key not working | New keys take up to 2 hours to activate |
| Blank page | Open browser DevTools → Console for errors |
| Location button fails | Allow location access in browser; HTTPS required in production |

---

## 📄 License

MIT — free to use, modify, and share.
