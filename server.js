// server.js
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const config = require('./config');

const app = express();
const PORT = config.PORT;

// --- Middleware ---
app.use(cors()); // Allows your frontend to talk to this server
app.use(express.json()); // Allows server to read JSON from requests

// --- PostgreSQL Connection ---
const pool = new Pool({
    connectionString: config.DATABASE_URL,
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err); // Don't let a pg client die due to unhandled errors
    process.exit(-1);
});

// --- API Endpoints ---

// Endpoint for User Registration
app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Save the user to the database
        const newUser = await pool.query(
            'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
            [email, passwordHash]
        );

        res.status(201).json({ message: "User registered successfully!", userId: newUser.rows[0].id });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: "Server error during registration." });
    }
});

// Endpoint for User Login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = userResult.rows[0];

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // Compare the submitted password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // Login successful!
        // In a real app, you would generate and send back a JSON Web Token (JWT) here.
        res.status(200).json({ message: "Login successful!", user: { id: user.id, email: user.email } });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: "Server error during login." });
    }
});

// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});