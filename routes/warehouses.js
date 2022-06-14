const express = require('express');
const router = express.Router();
const fs = require('fs');
const warehouseFile = fs.readFileSync('./data/warehouses.json') 

router.route('/')
    .get((_req, res) => {
        const warehouses = JSON.parse(warehouseFile);
        res.json(warehouses)
    })

module.exports = router;