# SIH 2026 Societal Innovation Collaboration Portal Database

This folder contains the database configuration, Mongoose models, and seed scripts for the project, completely separated from the backend logic.

## Prerequisites
- Node.js installed
- MongoDB Atlas account

## Setup Instructions

1. **Install Dependencies**
   Run the following command in this directory (`database/`):
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   - Create a `.env` file in the root of the `database/` folder (you can copy from `.env.example`).
   - Add your MongoDB Atlas connection string:
     ```
     MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/sih2026?retryWrites=true&w=majority
     ```
   *(Note: Never commit your `.env` file to GitHub. It is already added to `.gitignore`)*

3. **Running the Database Connection Test**
   To verify that your MongoDB connection works, you can run the test script:
   ```bash
   node test-connection.js
   ```

4. **Seeding the Database**
   To populate the database with sample data (e.g., sample Users and Problems), run:
   ```bash
   node seed/seed.js
   ```

## Integration with the Backend

If your existing `backend` folder already has Mongoose models, **do not unnecessarily duplicate them here**. 

Instead, you have two options for integration:
1. **Import from here:** Configure your backend to import the models and `config/db.js` directly from this `database` directory.
2. **Move existing models:** If you prefer keeping all database interactions decoupled, move the existing models from the `backend/models` folder into this `database/models` directory, and update the backend import paths.

The goal is to maintain a single source of truth for your database schemas while keeping the architecture modular.
