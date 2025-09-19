const express = require('express');
const router = express.Router();

// Import the Employee model 
const Employee = require('./../models/employee');

// Room rules
const ROOMS = {
  "ServerRoom": { minAccess: 2, open: "09:00", close: "11:00", cooldown: 15 },
  "Vault":      { minAccess: 3, open: "09:00", close: "10:00", cooldown: 30 },
  "R&D Lab":    { minAccess: 1, open: "08:00", close: "12:00", cooldown: 10 }
};

// Helper: convert HH:mm -> minutes
function toMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

//  Add employees (bulk insert)
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

//  Simulate access using DB data
router.get('/simulate', async (req, res) => {
  try {
    // Fetch requests sorted by time, then insertion order
    const requests = await Employee.find().sort({ request_time: 1, createdAt: 1 });

    const lastAccess = {};
    const results = [];

    for (const req of requests) {
      const { id, access_level, request_time, room } = req;
      const r = { id, room, request_time };

      const roomDef = ROOMS[room];
      if (!roomDef) {
        r.status = "Denied";
        r.reason = "Unknown room";
        results.push(r);
        continue;
      }

      const reqMin = toMinutes(request_time);
      const openMin = toMinutes(roomDef.open);
      const closeMin = toMinutes(roomDef.close);

      if (access_level < roomDef.minAccess) {
        r.status = "Denied";
        r.reason = `Below required level (${roomDef.minAccess})`;
      } else if (!(reqMin >= openMin && reqMin < closeMin)) {
        r.status = "Denied";
        r.reason = `Room closed (${roomDef.open}-${roomDef.close})`;
      } else {
        lastAccess[id] = lastAccess[id] || {};
        const last = lastAccess[id][room];
        if (last && reqMin - last < roomDef.cooldown) {
          r.status = "Denied";
          r.reason = `Cooldown active (${roomDef.cooldown} min)`;
        } else {
          r.status = "Granted";
          r.reason = `Access granted to ${room}`;
          lastAccess[id][room] = reqMin;
        }
      }
      results.push(r);
    }

    res.json({ results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
