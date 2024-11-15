// script.js

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
        const data = await response.json();
        return data;
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}

// Function to fetch forecast data
async function fetchForecast(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        alert(error.message);
        console.error(error);
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
    const iconUrl = `./weather/${weather[0].icon}.svg`; // Assuming the icon names match the OpenWeatherMap icon codes
    document.querySelector('.weather-icon img').src = iconUrl;
}

// Function to display forecast data
function displayForecast(data) {
    forecastContainer.innerHTML = ''; // Clear previous forecast
    const forecastItems = data.list.filter(item => item.dt_txt.includes('15:00')); // Get daily forecasts

    forecastItems.forEach(item => {
        const forecastDiv = document.createElement('div');
        forecastDiv.innerHTML = `
            <h5>${new Date(item.dt * 1000).toLocaleString('en-US', { weekday: 'long' })}</h5>
            <img src="${forecastIconUrl}" alt="${item.weather[0].description}">
            <h6>${Math.round(item.main.temp)}°</h6>
        `;
        forecastContainer.appendChild(forecastDiv);
    });
}

// Function to handle search
async function handleSearch() {
    const city = searchBox.value.trim();
    if (city) {
        const weatherData = await fetchWeather(city);
        if (weatherData) {
            const forecastData = await fetchForecast(city);
            if (forecastData) {
                displayWeather(weatherData);
                displayForecast(forecastData);
            }
        }
    } else {
        alert('Please enter a city name');
    }
}

// Event listener for search button
searchButton.addEventListener('click', handleSearch);

// Optional: Handle enter key press in search box
searchBox.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        handleSearch();
    }
});