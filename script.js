const apiKey = '4e8f85db32f7aecbfba1ac497ffddf04';
const searchButton = document.querySelector('.search-button');
const searchBox = document.querySelector('.search-box');
const locationDisplay = document.getElementById('location');
const tempDisplay = document.getElementById('temp');
const feelDisplay = document.getElementById('feel');
const weatherDisplay = document.getElementById('weather');
const humidityDisplay = document.getElementById('humid').querySelector('p');
const windDisplay = document.getElementById('wind').querySelector('p');
const forecastContainer = document.querySelector('.forecast-item');
const predictionContainer = document.querySelector('.prediction-data');

// Function to fetch weather data
async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        return await response.json();
    } catch (error) {
        alert(error.message);
        return null;
    }
}

// Function to fetch forecast data
async function fetchForecast(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        return await response.json();
    } catch (error) {
        alert(error.message);
        return null;
    }
}

// Function to display weather data
function displayWeather(data) {
    const { main, weather, wind, name } = data;
    locationDisplay.textContent = name.toUpperCase();
    tempDisplay.textContent = `${Math.round(main.temp)}°`;
    feelDisplay.textContent = `Feels like ${Math.round(main.feels_like)}°`;
    weatherDisplay.textContent = weather[0].main;
    humidityDisplay.textContent = `${main.humidity}%`;
    windDisplay.textContent = `${wind.speed} km/hr`;

    // Update weather icon
    updateWeatherIcon(weather[0].main);
}

// Function to update weather icon
function updateWeatherIcon(weatherCondition) {
    const weatherIcon = document.getElementById('weather-icon');
    let iconSrc;

    switch (weatherCondition.toLowerCase()) {
        case 'clear':
            iconSrc = '/arry/weather/clear.svg';
            break;
        case 'clouds':
            iconSrc = '/arry/weather/clouds.svg';
            break;
        case 'rain':
            iconSrc = '/arry/weather/rain.svg';
            break;
        case 'snow':
            iconSrc = '/arry/weather/snow.svg';
            break;
        case 'thunderstorm':
            iconSrc = '/arry/weather/thunderstorm.svg';
            break;
        default:
            iconSrc = '/arry/weather/default.svg';
            break;
    }

    weatherIcon.src = iconSrc;
}

// Function to display forecast data
function displayForecast(data) {
    forecastContainer.innerHTML = '';
    
    // Get the next 5 time periods (3-hour intervals)
    const forecastItems = data.list.slice(0, 5);
    
    forecastItems.forEach(item => {
        const time = new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit' });
        const temp = Math.round(item.main.temp);
        const icon = item.weather[0].main.toLowerCase();
        
        const forecastElement = document.createElement('div');
        forecastElement.classList.add('time');
        forecastElement.innerHTML = `
            <h5>${time}</h5>
            <span><img src="/arry/weather/${icon}.svg"></span>
            <h6>${temp}°</h6>
        `;
        forecastContainer.appendChild(forecastElement);
    });
}

// Event listener for search button
searchButton.addEventListener('click', async () => {
    const city = searchBox.value.trim();
    if (!city) return;
    
    const weatherData = await fetchWeather(city);
    if (weatherData) {
        displayWeather(weatherData);
        const forecastData = await fetchForecast(city);
        if (forecastData) {
            displayForecast(forecastData);
        }
    }
});

// Add event listener for Enter key
searchBox.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});

// Initialize with default city
window.addEventListener('load', async () => {
    const defaultCity = 'New Delhi';
    const weatherData = await fetchWeather(defaultCity);
    if (weatherData) {
        displayWeather(weatherData);
        const forecastData = await fetchForecast(defaultCity);
        if (forecastData) {
            displayForecast(forecastData);
        }
    }
});