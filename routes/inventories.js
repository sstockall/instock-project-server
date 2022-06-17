const express = require('express');
const router = express.Router();
const fs = require('fs');
var uniqid = require('uniqid')

// ----- Initial read of files -----
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

// ===== Get list of all inventory items =====
router.route('/')
    .get((_req, res) => {
        res.json(inventories)
    })

// ===== Get a single inventory item =====
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

// ===== Update single inventory item =====
router.route('/:inventoryId/edit')
    .put((req, res) => {
        const inventoryId = req.params.inventoryId
        let currentWarehouse = inventory.find(item => item.id === inventoryId)
        let currentIndex = inventory.findIndex(item => item.id === inventoryId)
        const { name, address, city, country, contactName, position, phone, email } = req.body
        if (!currentWarehouse) {
            res.status(400).send('Incorrect warehouse id.')
        } else {
            if (!dataIsValid(name, address, city, country, contactName, position, phone, email)) {
                res.status(400).send(errorMessage)
                errorMessage = ''
            } else {
                currentWarehouse = {
                    id: warehouseId,
                    name: name,
                    address: address,
                    city: city,
                    country: country,
                    contact: {
                        name: contactName,
                        position: position,
                        phone: phone,
                        email: email
                    }
                }
                res.status(201).send(`Edited warehouse with id: ${currentWarehouse.id}`)
                const warehouses = JSON.parse(warehouseFile)
                let updatedWarehouses = [...warehouses]
                updatedWarehouses[currentIndex] = currentWarehouse
                errorMessage = ''
                fs.writeFileSync('./data/warehouses.json', JSON.stringify(updatedWarehouses))
            }
        }
    })

module.exports = router; 
