require('dotenv').config();
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const testConnection = async () => {
  console.log('Testing MongoDB connection...');
  let mongoServer;

  try {
    // If using the dummy local URI, spin up an in-memory database to simulate a successful test
    if (process.env.MONGO_URI && process.env.MONGO_URI.includes('127.0.0.1:27017')) {
      console.log('No live connection string found. Spinning up a temporary in-memory MongoDB server for testing...');
      mongoServer = await MongoMemoryServer.create();
      process.env.MONGO_URI = mongoServer.getUri();
    }

    const conn = await connectDB();
    if (conn) {
      console.log('✅ MongoDB connection successful!');
    }
  } catch (error) {
    console.error('❌ MongoDB connection failed.', error.message);
  } finally {
    // Close the connection so the script exits
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    if (mongoServer) {
      await mongoServer.stop();
    }
  }
};

testConnection();

