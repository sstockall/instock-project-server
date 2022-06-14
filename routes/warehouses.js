const express = require('express');
const router = express.Router();
const fs = require('fs');
const warehoueseFile = fs.readFileSync('./data/warehouses.json') 

router.route('/')
    .get((_req, res) => {
        const warehoueses = JSON.parse(warehoueseFile);
        res.json(warehoueses)
    })

module.exports = router;