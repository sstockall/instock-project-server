const { match } = require('assert');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const warehouseFile = fs.readFileSync('./data/warehouses.json')
const uniqid = require('uniqid')

// ===== Add new warehouse =====
router.route('/new')
    .post((req, res) => {
        const { name, address, city, country, contactName, position, phone, email } = req.body
        if (!dataIsValid(name, address, city, country, contactName, position, phone, email)) {
            res.status(400).send(errorMessage)
            errorMessage = ''
        } else {
            let newWarehouse = {
                id: uniqid(),
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
            res.status(201).send(`New warehouse created with id: ${newWarehouse.id}`)
            const warehouses = JSON.parse(warehouseFile)
            let updatedWarehouses = [...warehouses, newWarehouse]
            errorMessage = ''
            fs.writeFileSync('./data/warehouses.json', JSON.stringify(updatedWarehouses))
        }
    })
// ------ validation methods ------
// errorMessage is returned to the post request detailing what information was invalid (missin info, wrong phone format and/or wrong email format)
let errorMessage = ''

const inputIsValid = (input) => {
    if (!input) {
        return false
    }
    return true
}
const dataIsValid = (name, address, city, country, contactName, position, phone, email) => {
    let areInputsValid = true
    if (!inputIsValid(name) || !inputIsValid(address) || !inputIsValid(city) || !inputIsValid(country) || !inputIsValid(contactName) || !inputIsValid(position)) {
        errorMessage = 'Incorrect or missing information.'
        areInputsValid = false
    }

    if (!phoneIsValid(phone)) {
        errorMessage += ' Invalid phone number, please use the format "+1 (647) 123-1234".'
        areInputsValid = false
    }
    if (!emailIsValid(email)) {
        errorMessage += ' Invalid email address.'
        areInputsValid = false
    }
    return areInputsValid
}

const emailIsValid = (input) => {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (input.match(mailformat)) {
        return true;
    } else {
        return false;
    }
}

const phoneIsValid = (input) => {
    let phoneformat = /^\+[0-9]+\s\(\d\d\d\)\s\d\d\d-\d\d\d\d$/i;
    if (input.match(phoneformat)) {
        return true;
    } else {
        return false;
    }
}

// ===== Get list of all warehouses items ===== 
router.route('/')
    .get((_req, res) => {
        const warehouses = JSON.parse(warehouseFile);
        res.json(warehouses)
    })

// ===== Get single warehouse ===== 
// getting warehouseId and then using this id to get all inventories for that warehouse
const inventoriesFile = fs.readFileSync('./data/inventories.json')
router.route('/:warehouseId')
    .get((req, res) => {
        const warehouses = JSON.parse(warehouseFile);
        const inventories = JSON.parse(inventoriesFile);
        const singleId = warehouses.find((house) => house.id === req.params.warehouseId);
        const singleWarehouse = inventories.filter((inventory) => inventory.warehouseID === singleId.id)

        if (!singleWarehouse) {
            res.status(404).send('Warehouse not found');
            return;
        }

        res.json(singleWarehouse);
    })
// ===== Delete single warehouse and associated inventories =====
router.route('/:warehouseId')
    .delete((req, res) => {
        const warehouseId = req.params.warehouseId
        const warehouses = JSON.parse(warehouseFile)
        const inventories = JSON.parse(inventoriesFile)
        const updatedWarehouses = warehouses.filter(item => item.id !== warehouseId)

        if (!warehouses.find(item => item.id !== warehouseId)) {
            res.status(400).send('Unable to delete. Warehouse id is incorrect.')
        } else {
            const updatedInventories = inventories.filter(item => item.warehouseID !== warehouseId)
            res.status(201).send(updatedWarehouses).send(`Deleted item with id: ${warehouseId}`)
            fs.writeFileSync('./data/warehouses.json', JSON.stringify(updatedWarehouses))
            fs.writeFileSync('./data/inventories.json', JSON.stringify(updatedInventories))
        }

    })

// ===== Update single warehouse =====
router.route('/:warehouseId/edit')
    .put((req, res) => {
        const warehouseId = req.params.warehouseId
        const warehouses = JSON.parse(warehouseFile);
        let currentWarehouse = warehouses.find(warehouse => warehouse.id === warehouseId)
        let currentIndex = warehouses.findIndex(warehouse => warehouse.id === warehouseId)
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