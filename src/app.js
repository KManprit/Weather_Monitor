require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const { updateWeatherData } = require('./controllers/weatherController');
const WeatherSummary = require('./models/WeatherSummary');
const path = require('path');
const Weather = require('./models/Weather');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public directory
app.use(express.json());

// Connect to the database
connectDB();

// API endpoint to get weather data
app.get('/weather', async (req, res) => {
    try {
        const weatherData = await Weather.find(); // Fetch all weather data from MongoDB
        res.render('weather', { weatherData }); // Pass the data to your HTML page
    } catch (error) {
        res.status(500).send('Error fetching weather data');
    }
});

// Set up view engine (using EJS as an example)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Fetch weather data at regular intervals (e.g., every 5 minutes)
setInterval(updateWeatherData, 300000); // 300000ms = 5 minutes

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    updateWeatherData(); // Call this once when the server starts
});

