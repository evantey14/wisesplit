const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'expenseTrackerData.json');

app.use(cors());
app.use(bodyParser.json());

app.get('/api/data', async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.json({ expenses: [], payments: [] });
    } else {
      res.status(500).json({ error: 'Error reading data' });
    }
  }
});

app.post('/api/data', async (req, res) => {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(req.body));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error saving data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});