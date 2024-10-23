// Import the axios library for making HTTP requests
const axios = require('axios');

// Function to fetch weather data using OpenWeatherMap API
const fetchWeatherData = async (city) => {
    const apiKey =  process.env.OPENWEATHERMAP_API_KEY;
   
    try {
        // Make a GET request to the OpenWeatherMap Current Weather API
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: city,        // City name
                appid: apiKey,  // API key
                units: 'metric' // Use metric units (Celsius)
            }
        });

        // Process and return the weather data
        return processWeatherData(response.data);
    } catch (error) {
        // Log any errors that occur during the API call
        console.error(`Error fetching weather data for ${city}:`, error.response ? error.response.data : error.message);
        return null; // Return null on error for better handling
    }
};

// Function to process the fetched weather data
const processWeatherData = (data) => {
    const tempCelsius = data.main.temp; // Access temperature in Celsius
    const weatherCondition = data.weather[0].description; // Access weather condition

    return {
        date: new Date(), // Current date
        avgTemp: tempCelsius,
        dominantCondition: weatherCondition
    };
};

// Example usage of the fetchWeatherData function for multiple cities
(async () => {
    const cities = ['Hyderabad', 'Delhi', 'Mumbai', 'Chennai']; // List of cities
    for (const city of cities) {
        const weatherData = await fetchWeatherData(city); // Fetch weather data for each city
        if (weatherData) {
            console.log(`Weather Data for ${city}:`, weatherData);
        } else {
            console.log(`Failed to fetch weather data for ${city}`);
        }
    }
})();
module.exports = {fetchWeatherData ,processWeatherData} ;