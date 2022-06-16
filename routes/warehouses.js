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
            console.log(newWarehouse)
            // fs.writeFileSync('./data/warehouses.json', JSON.stringify(updatedWarehouses))
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
    if (!inputIsValid(name) || !inputIsValid(address) || !inputIsValid(city) || !inputIsValid(country) || !inputIsValid(contactName) || !inputIsValid(position) || !phoneIsValid(phone) || !emailIsValid(email)) {
        return false
    } else {
        return true
    }
}

const emailIsValid = (input) => {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (input.match(mailformat)) {
        console.log("Valid email address!")
        return true;
    }
    else {
        console.log("You have entered an invalid email address!");
        return false;
    }
}

const phoneIsValid = (input) => {
    let phoneformat = /^\+[0-9]+\s\(\d\d\d\)\s\d\d\d-\d\d\d\d$/i;
    if(input.match(phoneformat)) {
        console.log("Valid phone number!")
        return true;
    }
    else {
        console.log("You have entered an invalid phone number!");
        return false;
    }
}

// ===== Get list of all warehouses items =====
router.route('/')
    .get((_req, res) => {
        const warehouses = JSON.parse(warehouseFile);
        res.json(warehouses)
    })

module.exports = router;