const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Schema & Model
const Employee = mongoose.model('Employee', new mongoose.Schema({
  id: String,
  access_level: Number,
  request_time: String,
  room: String
}, { timestamps: true }));

// Room rules
const ROOMS = {
  "ServerRoom": { minAccess: 2, open: "09:00", close: "11:00", cooldown: 15 },
  "Vault":      { minAccess: 3, open: "09:00", close: "10:00", cooldown: 30 },
  "R&D Lab":    { minAccess: 1, open: "08:00", close: "12:00", cooldown: 10 }
};

function toMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

// ================= Routes =================

// Add employees
router.post('/employees', async (req, res) => {
  try {
    const result = await Employee.insertMany(req.body);
    res.status(201).json({ inserted: result.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: 1 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
