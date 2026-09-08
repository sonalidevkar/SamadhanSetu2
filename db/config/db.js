const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI || process.env.MONGO_URI === 'your_mongodb_connection_string') {
      throw new Error('MONGO_URI is missing or invalid. Please set a valid MongoDB connection string in the .env file.');
    }
    
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Instead of exiting process here, throw the error so test-connection.js can catch it gracefully
    throw error;
  }
};

module.exports = connectDB;
