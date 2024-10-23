const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    avgTemp: { type: Number, required: true },
    dominantCondition: { type: String, required: true },
    city: { type: String, required: true } // Ensure the city field is defined
});

const Weather = mongoose.model('Weather', weatherSchema);
module.exports = Weather;
