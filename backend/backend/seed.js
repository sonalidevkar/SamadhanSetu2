const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('./server/models/User');
const University = require('./server/models/University');
const Industry = require('./server/models/Industry');
const Team = require('./server/models/Team');

dotenv.config();

const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sih_portal';
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected for Seeding');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

const importData = async () => {
    await connectDB();
    try {
        await User.deleteMany();
        await University.deleteMany();
        await Industry.deleteMany();
        await Team.deleteMany();

        // 1. Create Users
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        const admin = await User.create({
            name: 'System Admin',
            email: 'admin@sih.gov',
            password: hashedPassword,
            role: 'Admin'
        });

        const citizen = await User.create({
            name: 'Raju Kumar',
            email: 'raju@example.com',
            password: hashedPassword,
            role: 'Citizen'
        });

        // 2. Create Universities
        const uni1 = await University.create({
            universityName: 'NIT Jamshedpur',
            location: 'Jamshedpur, Jharkhand',
            departments: ['Computer Science', 'Civil Engineering', 'Mechanical Engineering'],
            facultyExpertise: ['AI', 'Water Management', 'Infrastructure', 'Computer Science', 'Hydrology'],
            researchAreas: ['Water Management', 'Infrastructure'],
            skills: ['Python', 'MERN', 'AutoCAD']
        });

        const uni2 = await University.create({
            universityName: 'IIT ISM Dhanbad',
            location: 'Dhanbad, Jharkhand',
            departments: ['Mining', 'Environmental Science', 'Electrical Engineering'],
            facultyExpertise: ['Environment', 'Power Systems', 'Data Science', 'Environmental Science'],
            researchAreas: ['Healthcare', 'Electricity']
        });

        // 3. Create Industries
        const ind1 = await Industry.create({
            companyName: 'Tata Steel',
            industryDomain: 'Infrastructure',
            expertise: ['Civil Engineering', 'Materials', 'Infrastructure'],
            CSRCapability: true,
            location: 'Jamshedpur'
        });

        const ind2 = await Industry.create({
            companyName: 'AquaTech Solutions',
            industryDomain: 'Water Management',
            expertise: ['Hydrology', 'IoT', 'Water Filtration'],
            prototypingCapability: true,
            location: 'Ranchi'
        });

        // 4. Create Teams
        await Team.create({
            teamName: 'Water Innovators',
            university: uni1._id,
            expertise: ['Water Management', 'Hydrology', 'Civil Engineering'],
            skills: ['IoT', 'Data Analysis'],
            status: 'AVAILABLE'
        });

        await Team.create({
            teamName: 'Smart Infra Team',
            university: uni1._id,
            expertise: ['Infrastructure', 'Civil Engineering'],
            skills: ['AutoCAD', 'Structural Analysis'],
            status: 'AVAILABLE'
        });

        console.log('Data Imported successfully!');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    // Delete data logic can go here
    console.log('Destruction not implemented in this script.');
    process.exit();
} else {
    importData();
}
