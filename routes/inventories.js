const express = require('express');
const router = express.Router();
const fs = require('fs');
var uniqid = require('uniqid')

const getWareHouses = () => {
    const warehouseFile = fs.readFileSync('./data/warehouses.json')
    
}

// T25: new inventory item

router.route('/new')
.post((req, res) => {

})

// input: name, description, category, statys, quantity, warehouseID
// get warehouseName, assign id

module.exports = router