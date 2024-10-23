
const axios = require('axios'); 

const WeatherSummary = require("../models/WeatherSummary");
const { fetchWeatherData, processWeatherData } = require('../services/weatherService');
const Weather = require('../models/Weather');


async function updateWeatherData() {
    const cities = ['Hyderabad', 'Delhi', 'Mumbai', 'Chennai']; // Add your cities here
    for (const city of cities) {
        try {
            const response = await axios.get(`YOUR_WEATHER_API_URL`, {
                params: { q: city, appid: process.env.WEATHER_API_KEY } // Ensure your API key is set
            });
            const weatherData = {
                date: new Date(),
                avgTemp: response.data.main.temp, // Adjust based on the actual response structure
                dominantCondition: response.data.weather[0].description, // Adjust based on the actual response structure
                city: city // Add city field
            };

            // Save to the database
            await Weather.create(weatherData);
            console.log(`Weather Data for ${city}:`, weatherData);
        } catch (error) {
            console.error(`Error fetching or storing weather data for ${city}:`, error);
        }
    }
}

module.exports = { updateWeatherData };

//Explanation:
// The controller fetches weather data for the specified cities, processes it (e.g., converting temperatures), and stores daily summaries in the MongoDB database. This runs at a configured interval (e.g., every 5 minutes).

