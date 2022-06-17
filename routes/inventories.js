const express = require('express');
const router = express.Router();
const fs = require('fs');
var uniqid = require('uniqid')

<<<<<<< HEAD
// ----- Initial read of files -----
=======
// ===== ADD new inventory item =====
>>>>>>> 1b8ca40aa2bdc46e6b17ffb02091a54f1dc667e6
const warehousesFile = fs.readFileSync('./data/warehouses.json')
const warehouses = JSON.parse(warehousesFile)
const inventoryFile = fs.readFileSync('./data/inventories.json');
const inventories = JSON.parse(inventoryFile);
// ===== Add new inventory item =====
router.route('/new')
    .post((req, res) => {
        const { name, description, category, status, quantity, warehouseId } = req.body
        if (!dataIsValid(name, description, category, status, quantity, warehouseId)) {
            res.status(400).send("Incorrect or missing information sent to server")
        } else {
            const warehouseFound = warehouses.find(warehouse => warehouse.id === warehouseId)
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
            const inventories = JSON.parse(inventoryFile)
            let updatedInventories = [...inventories, newInventoryItem]
            fs.writeFileSync('./data/inventories.json', JSON.stringify(updatedInventories))
        }
    })
// ------ validation methods ------
const inputIsValid = (input) => {
    if (!input) {
        return false
    }
    return true
}
const dataIsValid = (name, description, category, status, quantity, warehouseId) => {
    if (!inputIsValid(name) || !inputIsValid(description) || !inputIsValid(category) || !inputIsValid(status) || !inputIsValid(quantity) || !inputIsValid(warehouseId)) {
        return false
    } else {
        return true
    }
}

<<<<<<< HEAD
// ===== Get list of all inventory items =====
=======
// ===== GET list of ALL inventory items =====
const inventoryFile = fs.readFileSync('./data/inventories.json');
>>>>>>> 1b8ca40aa2bdc46e6b17ffb02091a54f1dc667e6
router.route('/')
    .get((_req, res) => {
        res.json(inventories)
    })

// ===== GET a SINGLE inventory item =====
// go through all inventory items and find the one whose ID matches the ID of request made
router.route('/:itemId')
    .get((req, res) => {
        const singleItem = inventories.find((item) => item.id === req.params.itemId);
        // if single item is falsy, send 404
        if (!singleItem) {
            res.status(404).send("Item not found");
            return;
        }
        // send single item to client
        res.status(201).json(singleItem);
    })

<<<<<<< HEAD
// ===== Update single inventory item =====
router.route('/:inventoryId/edit')
    .put((req, res) => {
        const inventoryId = req.params.inventoryId
        let currentItem = inventories.find(item => item.id === inventoryId)
        let warehouseId = currentItem.warehouseID
        let currentIndex = inventories.findIndex(item => item.id === inventoryId)
        const { name, description, category, status, quantity } = req.body
        if (!currentItem) {
            res.status(400).send('Incorrect inventory item id.')
        } else {
            if (!dataIsValid(name, description, category, status, quantity, warehouseId)) {
                res.status(400).send('Incorrect or missing information sent to server')
            } else {
                const warehouseFound = warehouses.find(warehouse => warehouse.id === warehouseId)
                let updatedInventoryItem = {
                    id: inventoryId,
                    warehouseID: warehouseId,
                    warehouseName: warehouseFound.name,
                    itemName: name,
                    description: description,
                    category: category,
                    status: status,
                    quantity: quantity
                }
                let updatedInventory = [...inventories]
                updatedInventory[currentIndex] = updatedInventoryItem
                res.status(201).send(`Edited inventory item with id: ${inventoryId}`)
                fs.writeFileSync('./data/inventories.json', JSON.stringify(updatedInventory))
            }
        }
    })
=======
// ===== EDIT a single inventory item =====
// lol this is how far I got
router.route('/edit')
    .put((req, res) => {
       

    })

    .patch((req, res) => {

    })
 

>>>>>>> 1b8ca40aa2bdc46e6b17ffb02091a54f1dc667e6

module.exports = router; 
