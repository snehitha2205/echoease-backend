const express = require('express');
const router = express.Router();
const Appliance = require('../models/appliance');

// Endpoint to fetch all appliances
router.get('/', async (req, res) => {
  try {
    const appliances = await Appliance.find();
    res.status(200).json(appliances);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appliances' });
  }
});

// Endpoint to toggle appliance status
router.post('/toggle', async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'Appliance ID is required' });
  }

  try {
    const appliance = await Appliance.findById(id);
    if (!appliance) {
      return res.status(404).json({ error: 'Appliance not found' });
    }

    // Toggle appliance status
    appliance.status = !appliance.status;
    await appliance.save();

    const appliances = await Appliance.find(); // Fetch updated appliances
    res.status(200).json(appliances);
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle appliance' });
  }
});

module.exports = router;
