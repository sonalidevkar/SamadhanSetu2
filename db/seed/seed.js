require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');

// Models
const User = require('../models/User');
const Problem = require('../models/Problem');

const seedData = async () => {
  await connectDB();

  try {
    // Clear existing data
    await User.deleteMany();
    await Problem.deleteMany();

    console.log('Existing data cleared.');

    // Seed dummy users
    const users = await User.insertMany([
      { name: 'Admin User', email: 'admin@test.com', password: 'password123', role: 'admin' },
      { name: 'Student One', email: 'student1@test.com', password: 'password123', role: 'student' }
    ]);

    // Seed dummy problems
    await Problem.create([
      { title: 'Water Scarcity', description: 'Address water scarcity in rural areas', category: 'Environment', submittedBy: users[0]._id },
      { title: 'Traffic Management', description: 'AI based traffic management', category: 'Infrastructure', submittedBy: users[0]._id }
    ]);

    console.log('Seed data inserted successfully.');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
