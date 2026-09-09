const mongoose = require('mongoose');
const { MONGO_URI } = require('./env');

const connectDB = async () => {
    try {
        let uri = MONGO_URI;
        let conn;
        try {
            conn = await mongoose.connect(uri);
        } catch (initialError) {
            console.log(`Failed to connect to ${uri}, attempting to use in-memory MongoDB...`);
            const { MongoMemoryServer } = require('mongodb-memory-server');
            const mongoServer = await MongoMemoryServer.create();
            uri = mongoServer.getUri();
            conn = await mongoose.connect(uri);
            console.log('Successfully started and connected to in-memory MongoDB server as fallback');
        }
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
