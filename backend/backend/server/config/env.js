const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../../.env') });

const requiredEnvVars = [
    'PORT',
    'MONGO_URI',
    'JWT_SECRET',
    'AI_SERVICE_URL',
    'UPLOAD_DIR'
];

requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
        console.warn(`Warning: Environment variable ${envVar} is missing.`);
    }
});

module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sih_portal',
    JWT_SECRET: process.env.JWT_SECRET || 'supersecretjwtkey',
    AI_SERVICE_URL: process.env.AI_SERVICE_URL || 'http://localhost:8000',
    UPLOAD_DIR: process.env.UPLOAD_DIR || '../uploads'
};
