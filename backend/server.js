import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';

const app = express();
const PORT = 3001;
const CSV_PATH = path.resolve('../bookings.csv');

app.use(cors());
app.use(express.json());

// GET /bookings - serve the CSV file
app.get('/bookings', async (req, res) => {
  try {
    const csv = await fs.readFile(CSV_PATH, 'utf8');
    res.type('text/csv').send(csv);
  } catch (err) {
    res.status(500).json({ error: 'Could not read bookings.csv' });
  }
});

// POST /bookings - add a new booking row
app.post('/bookings', async (req, res) => {
  const { facility, day, start_time, end_time, status } = req.body;
  if (!facility || !day || !start_time || !end_time || !status) {
    return res.status(400).json({ error: 'Missing booking fields' });
  }
  const newRow = `\n${facility},${day},${start_time},${end_time},${status}`;
  try {
    await fs.appendFile(CSV_PATH, newRow, 'utf8');
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Could not append to bookings.csv' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
}); 