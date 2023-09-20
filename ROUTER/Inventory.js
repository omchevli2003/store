// const   mongoose = require('mon');
const express = require('express');
const inventory  = require('./../MODULES/InventorySchema');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const inventoryData = await inventory.find();
      res.status(200).json({ data: inventoryData });
    } catch (error) {
      // Handle errors and send an appropriate response
      console.error('Error fetching inventory data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  


module.exports = router;

