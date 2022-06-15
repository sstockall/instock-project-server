const express = require('express');
const router = express.Router();
const fs = require('fs');
var uniqid = require('uniqid')

const getWareHouses = () => {
    const warehousesFile = fs.readFileSync('./data/warehouses.json')
    const warehouses = JSON.parse(warehousesFile)
    
}

// T25: new inventory item

router.route('/new')
.post((req, res) => {

})

// input: name, description, category, statys, quantity, warehouseID
// get warehouseName, assign id

const inventoryFile = fs.readFileSync('./data/inventories.json');

// GET LIST OF ALL INVENTORY ITEMS FROM ALL WAREHOUSES

router.route('/')
    .get((_req, res) => {
        const inventories = JSON.parse(inventoryFile);
        res.json(inventories)
    })

module.exports = router; 
