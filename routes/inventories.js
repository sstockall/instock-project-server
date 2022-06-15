const express = require('express');
const router = express.Router();
const fs = require('fs');
var uniqid = require('uniqid')


// T25: new inventory item

// const formErrors = {
//     name: 'Item name is required',
//     description: 'Description is required',
//     category: 'Category must be selected',
//     status: 'Status must be selected',
//     quantity: 'Quantity is required',
//     warehouse: 'Warehouse must be selcted'
// }

// const inputValidation = (input) => {
//     if (!input) {
//         return 
//     }
// }
const warehousesFile = fs.readFileSync('./data/warehouses.json')
const warehouses = JSON.parse(warehousesFile)
router.route('/new')
    .post((req, res) => {
        const { name, description, category, status, quantity, warehouseId } = req.body
        const warehouseFound = warehouses.find(item => item.id === warehouseId)
        let newInventoryItem = {
            id: uniqid(),
            warehouseID: warehouseId,
            warehouseName: warehouseFound.name,
            itemName: name,
            description: description,
            category: category,
            status: status,
            quantity: quantity
        }
        res.status(201).send(newInventoryItem)
    })

const inventoryFile = fs.readFileSync('./data/inventories.json');

// GET LIST OF ALL INVENTORY ITEMS FROM ALL WAREHOUSES

router.route('/')
    .get((_req, res) => {
        const inventories = JSON.parse(inventoryFile);
        res.json(inventories)
    })

module.exports = router; 
