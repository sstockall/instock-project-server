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

module.exports = router;