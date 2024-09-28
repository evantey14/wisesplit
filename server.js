const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-render-app-url.onrender.com']
}));

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