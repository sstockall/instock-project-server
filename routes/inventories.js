const express = require('express');
const router = express.Router();
const fs = require('fs');
const inventoryFile = fs.readFileSync('../data/inventories.json');

// GET LIST OF ALL INVENTORY ITEMS FROM ALL WAREHOUSES

router.route('/')
    .get((_req, res) => {
        const inventories = JSON.parse(inventoryFile);
        res.json(inventories)
    })

module.exports = router; 