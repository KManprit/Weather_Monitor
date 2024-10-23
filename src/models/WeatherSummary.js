const mongoose = require('mongoose');

const WeatherSummarySchema = new mongoose.Schema({
    date: { type: Date, required: true },
    avgTemp: { type: Number, required: true },
    maxTemp: { type: Number, required: true },
    minTemp: { type: Number, required: true },
    dominantCondition: { type: String, required: true },
});

module.exports = mongoose.model('WeatherSummary', WeatherSummarySchema);
