const express = require('express');
const router = express.Router();
const fs = require('fs');
const warehouseFile = fs.readFileSync('./data/warehouses.json') 
const inventoriesFile = fs.readFileSync('./data/inventories.json')

//Get all warehouses
router.route('/')
    .get((_req, res) => {
        const warehouses = JSON.parse(warehouseFile);
        res.json(warehouses)
    })

//Get single warehouse ID and then use ID to get all inventories for this
//warehouse     
router.route('/:warehouseId')
    .get((req, res) => {
        const warehouses = JSON.parse(warehouseFile);
        const inventories = JSON.parse(inventoriesFile);
        const singleId = warehouses.find((house) => house.id === req.params.warehouseId);
        const singleWarehouse = inventories.filter((inventory) => inventory.warehouseID === singleId.id)

        if(!singleWarehouse) {
            res.status(404).send('Warehouse not found');
            return;
        }

        res.json(singleWarehouse);
    })

module.exports = router;