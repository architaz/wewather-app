# Weather App 🌤️

A modern, responsive weather application that provides current weather conditions and forecasts using the OpenWeatherMap API.

## Features

- **Current Weather**: Real-time temperature, feels-like temperature, humidity, and wind speed
- **Location Detection**: Automatically detects user location or defaults to New Delhi
- **City Search**: Search for weather in any city worldwide
- **Hourly Forecast**: 24-hour weather forecast with 3-hour intervals
- **7-Day Forecast**: Weekly weather outlook with min/max temperatures
- **Weather Icons**: Dynamic SVG icons matching current conditions
- **Responsive Design**: Clean, modern interface with smooth animations

## Setup

1. **Get API Key**: Sign up at [OpenWeatherMap](https://openweathermap.org/api) and get your free API key

2. **Update API Key**: Replace the API key in the JavaScript file:
   ```javascript
   const apiKey = 'YOUR_API_KEY_HERE';
   ```

3. **Run**: Open the HTML file in any modern web browser

## Usage

- **Auto-location**: Allow location access for local weather
- **Search**: Type city name and click search or press Enter
- **View Forecasts**: Scroll to see hourly and daily forecasts

## Technologies

- **HTML5** - Structure
- **CSS3** - Modern styling with gradients and animations
- **JavaScript (ES6+)** - API integration and dynamic content
- **OpenWeatherMap API** - Weather data source
- **Font Awesome** - Icons

## API Endpoints Used

- Current Weather: `api.openweathermap.org/data/2.5/weather`
- 5-Day Forecast: `api.openweathermap.org/data/2.5/forecast`

---
