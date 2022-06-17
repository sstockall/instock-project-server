const express = require('express');
const router = express.Router();
const fs = require('fs');
var uniqid = require('uniqid')

// ===== ADD new inventory item =====
const warehousesFile = fs.readFileSync('./data/warehouses.json')
const warehouses = JSON.parse(warehousesFile)
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

// ===== GET list of ALL inventory items =====
const inventoryFile = fs.readFileSync('./data/inventories.json');
router.route('/')
    .get((_req, res) => {
        const inventories = JSON.parse(inventoryFile);
        res.json(inventories)
    })

// ===== GET a SINGLE inventory item =====
// go through all inventory items and find the one whose ID matches the ID of request made
const inventories = JSON.parse(inventoryFile);
router.route('/:itemId')
    .get((req, res) => {
        const singleItem = inventories.find((item) => item.id ===req.params.itemId);

// if single item is falsy, send 404
    if (!singleItem){
        res.status(404).send("Item not found");
        return;
    }
// send single item to client
    res.json(singleItem);
    })

// ===== EDIT a single inventory item =====
// lol this is how far I got
router.route('/edit')
    .put((req, res) => {
       

    })

    .patch((req, res) => {

    })
 


module.exports = router; 
