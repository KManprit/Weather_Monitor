const mongoose = require('mongoose');
require('dotenv').config();  // To load environment variables from the .env file

const connectDB = async () => {
  try {
      await mongoose.connect(process.env.MONGO_URI, {
       
      });
      console.log("MongoDB connected successfully!!!!!!");
  } catch (error) {
      console.error("MongoDB connection failed:", error);
      process.exit(1); // Exit the app on failure
  }
};

module.exports = connectDB;
