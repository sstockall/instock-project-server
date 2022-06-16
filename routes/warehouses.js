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
            res.status(400).send("Incorrect or missing information sent to server")
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
            res.status(201).send(newWarehouse)
            const warehouses = JSON.parse(warehouseFile)
            let updatedWarehouses = [...warehouses, newWarehouse]
            fs.writeFileSync('./data/warehouses.json', JSON.stringify(updatedWarehouses))
        }
    })
// ------ validation methods ------
const inputIsValid = (input) => {
    if (!input) {
        return false
    }
    return true
}
const dataIsValid = (name, address, city, country, contactName, position, phone, email) => {
    if (!inputIsValid(name) || !inputIsValid(address) || !inputIsValid(city) || !inputIsValid(country) || !inputIsValid(contactName) || !inputIsValid(position) || !inputIsValid(phone) || !inputIsValid(email)) {
        return false
    } else {
        return true
    }
}

// ===== Get list of all warehouses items =====
router.route('/')
    .get((_req, res) => {
        const warehouses = JSON.parse(warehouseFile);
        res.json(warehouses)
    })

module.exports = router;