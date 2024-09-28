const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');
require('dotenv').config(); // Add this line to load environment variables

const app = express();
const PORT = process.env.PORT || 3001;

const API_KEY = process.env.API_KEY; // Read API_KEY from environment variable

if (!API_KEY) {
  console.error('API_KEY is not set in environment variables');
  process.exit(1);
}

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://wisesplit.onrender.com', 'https://wisesplit-1.onrender.com'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware to check API key
const checkApiKey = (req, res, next) => {
  const apiKey = req.get('Authorization');
  if (apiKey !== `Bearer ${API_KEY}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Apply API key check to all routes
app.use('/api', checkApiKey);

const DATA_FILE = path.join(__dirname, 'data.json');

// Initialize data file if it doesn't exist
async function initializeDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch (error) {
    await fs.writeFile(DATA_FILE, JSON.stringify({ expenses: [], payments: [] }));
  }
}

// Read data from file
async function readData() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data file:', error);
    return { expenses: [], payments: [] };
  }
}

// Write data to file
async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// API routes
app.get('/api/data', async (req, res) => {
  try {
    const data = await readData();
    res.json(data);
  } catch (error) {
    console.error('Error in /api/data route:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

app.post('/api/expenses', async (req, res) => {
  const data = await readData();
  data.expenses.push(req.body);
  await writeData(data);
  res.json(data.expenses);
});

app.post('/api/payments', async (req, res) => {
  const data = await readData();
  data.payments.push(req.body);
  await writeData(data);
  res.json(data.payments);
});

// Serve static files
app.use(express.static(path.join(__dirname, 'build')));

// Handle any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// New test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

initializeDataFile().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});