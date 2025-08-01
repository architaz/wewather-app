const apiKey = '4e8f85db32f7aecbfba1ac497ffddf04';

const searchButton = document.querySelector('.search-button');
const searchBox = document.querySelector('.search-box');
const locationDisplay = document.getElementById('location');
const tempDisplay = document.getElementById('temp');
const feelDisplay = document.getElementById('feel');
const weatherDisplay = document.getElementById('weather');
const humidityDisplay = document.getElementById('humidity');
const windDisplay = document.getElementById('wind-speed');
const hourlyForecast = document.getElementById('hourly-forecast');
const dailyForecast = document.getElementById('daily-forecast');
const errorMessage = document.getElementById('error-message');

const weatherIcons = {
    'clear': '/arry/weather/clear.svg',
    'clouds': '/arry/weather/clouds.svg',
    'rain': '/arry/weather/rain.svg',
    'snow': '/arry/weather/snow.svg',
    'thunderstorm': '/arry/weather/thunderstorm.svg',
    'mist': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGxpbmUgeDE9IjgiIHkxPSIyNCIgeDI9IjU2IiB5Mj0iMjQiIHN0cm9rZT0iIzg3Q0VFQiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPGxpbmUgeDE9IjE2IiB5MT0iMzIiIHgyPSI0OCIgeTI9IjMyIiBzdHJva2U9IiM4N0NFRUIiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxsaW5lIHgxPSIxMiIgeTE9IjQwIiB4Mj0iNTIiIHkyPSI0MCIgc3Ryb2tlPSIjODdDRUVCIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K',
    'haze': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGxpbmUgeDE9IjgiIHkxPSIyNCIgeDI9IjU2IiB5Mj0iMjQiIHN0cm9rZT0iI0ZGRjciIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBvcGFjaXR5PSIwLjciLz4KPGxpbmUgeDE9IjE2IiB5MT0iMzIiIHgyPSI0OCIgeTI9IjMyIiBzdHJva2U9IiNGRkY3IiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgb3BhY2l0eT0iMC43Ii8+CjxsaW5lIHgxPSIxMiIgeTE9IjQwIiB4Mj0iNTIiIHkyPSI0MCIgc3Ryb2tlPSIjRkZGNyIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIG9wYWNpdHk9IjAuNyIvPgo8L3N2Zz4K',
    'default': '/arry/weather/default.svg'
};

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 3000);
}

// Function to get weather icon
function getWeatherIcon(condition) {
    const conditionLower = condition.toLowerCase();
    if (weatherIcons[conditionLower]) {
        return weatherIcons[conditionLower];
    }
    // Default to default if no match
    return weatherIcons['default'];
}

// Function to fetch weather data
async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        return await response.json();
    } catch (error) {
        showError(error.message);
        return null;
    }
}

// Function to fetch forecast data (5-day forecast with 3-hour intervals)
async function fetchForecast(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        return await response.json();
    } catch (error) {
        showError(error.message);
        return null;
    }
}

// Function to display current weather data
function displayWeather(data) {
    const { main, weather, wind, name } = data;
    locationDisplay.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${name.toUpperCase()}`;
    tempDisplay.textContent = `${Math.round(main.temp)}°`;
    feelDisplay.textContent = `Feels like ${Math.round(main.feels_like)}°`;
    weatherDisplay.textContent = weather[0].main;
    humidityDisplay.textContent = `${main.humidity}%`;
    windDisplay.textContent = `${Math.round(wind.speed * 3.6)} km/h`; // Convert m/s to km/h

    // Update weather icon
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.src = getWeatherIcon(weather[0].main);
}

// Function to display forecast data
function displayHourlyForecast(data) {
    hourlyForecast.innerHTML = '';
    
    // Get the next 8 time periods (24 hours worth of 3-hour intervals)
    const forecastItems = data.list.slice(0, 8);
    
    forecastItems.forEach((item, index) => {
        const date = new Date(item.dt * 1000);
        let timeLabel;
        if (index === 0) {
            timeLabel = 'Now';
        } else {
            timeLabel = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        }

        const temp = Math.round(item.main.temp);
        const condition = item.weather[0].main;

        const forecastElement = document.createElement('div');
        forecastElement.classList.add('time');
        forecastElement.innerHTML = `
            <h5>${timeLabel}</h5>
            <img src="${getWeatherIcon(condition)}" alt="${condition}">
            <h6>${temp}°</h6>
        `;
        hourlyForecast.appendChild(forecastElement);
    });
}

// Function to display 7-day forecast
function displayDailyForecast(data) {
    dailyForecast.innerHTML = '';

    // Group by data by day
    const dailyData = {};
    const today = new Date().toDateString();

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toDateString();

        if (!dailyData[dayKey]) {
            dailyData[dayKey] = {
                temps: [],
                conditions: [],
                date: date
            };
        }

        dailyData[dayKey].temps.push(Math.round(item.main.temp));
        dailyData[dayKey].conditions.push(item.weather[0].main);
    });

    // Get the days and limit to 7 days
    const days = Object.keys(dailyData).slice(0, 7);

    days.forEach((dayKey, index) => {
        const dayData = dailyData[dayKey];
        const maxTemp = Math.round(Math.max(...dayData.temps));
        const minTemp = Math.round(Math.min(...dayData.temps));

        // Get the most common weather condition for the day
        const conditionCounts = {};
        dayData.conditions.forEach(condition => {
            conditionCounts[condition] = (conditionCounts[condition] || 0) + 1;
        });
        const mostCommonCondition = Object.keys(conditionCounts).reduce((a, b) => conditionCounts[a] > conditionCounts[b] ? a : b);

        let dayLabel;
        if (index === 0 && dayKey === today) {
            dayLabel = 'Today';
        } else if (index === 1){
            dayLabel = 'Tomorrow';
        } else {
            dayLabel = dayData.date.toLocaleDateString([], { weekday: 'long' });
        }

        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.innerHTML = `
            <h5>${dayLabel}</h5>
            <img src="${getWeatherIcon(mostCommonCondition)}" alt="${mostCommonCondition}">
            <div class="day-temps">
                <h6 class="temp-min">${minTemp}°</h6>
                <h6>${maxTemp}°</h6>
            </div>
        `;
        dailyForecast.appendChild(dayElement);
    });
}

// Event listener for search button
searchButton.addEventListener('click', async () => {
    const city = searchBox.value.trim();
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    searchButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    searchButton.disabled = true;
    
    const weatherData = await fetchWeather(city);
    if (weatherData) {
        displayWeather(weatherData);
        const forecastData = await fetchForecast(city);
        if (forecastData) {
            displayHourlyForecast(forecastData);
            displayDailyForecast(forecastData);
        }
        searchBox.value = '';
    }
    searchButton.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';
    searchButton.disabled = false;
});

// Add event listener for Enter key
searchBox.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});

// Function to get user's location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                        
                try {
                    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
                    if (response.ok) {
                        const weatherData = await response.json();
                        displayWeather(weatherData);
                                
                        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
                        if (forecastResponse.ok) {
                            const forecastData = await forecastResponse.json();
                            displayHourlyForecast(forecastData);
                            displayDailyForecast(forecastData);
                        }
                    } else {
                        loadDefaultWeather();
                    }
                } catch (error) {
                    loadDefaultWeather();
                }
            },
            (error) => {
                // If geolocation fails, load default city
                loadDefaultWeather();
            }
        );
    } else {
        loadDefaultWeather();
    }
}

// Function to load default weather (New Delhi)
async function loadDefaultWeather() {
    const defaultCity = 'New Delhi';
    const weatherData = await fetchWeather(defaultCity);
    if (weatherData) {
        displayWeather(weatherData);
        const forecastData = await fetchForecast(defaultCity);
        if (forecastData) {
            displayHourlyForecast(forecastData);
            displayDailyForecast(forecastData);
        }
    }
}

// Initialize the app
window.addEventListener('load', () => {
    getUserLocation();
});