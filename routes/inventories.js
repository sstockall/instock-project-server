const express = require('express');
const router = express.Router();
const fs = require('fs');
const inventoryFile = fs.readFileSync('../data/inventories.json');

const inventoryParsed = JSON.parse(inventoryFile);

// GET LIST OF ALL INVENTORY ITEMS FROM ALL WAREHOUSES
