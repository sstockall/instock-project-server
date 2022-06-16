const express = require('express');
const app = express();
const fs = require('fs'); 
const cors = require('cors'); 

//Middleware
app.use(express.json());
app.use(cors());

// Routes
const warehousesRoute = require('./routes/warehouses');
app.use('/warehouses', warehousesRoute);

const inventoriesRoute = require('./routes/inventories');
app.use('/inventories', inventoriesRoute);

const invFile = fs.readFileSync('./data/inventories.json')
const inv = JSON.parse(invFile)
const invCat = inv.map(item => item.category)
const uniqueCat = [... new Set(invCat)]

app.listen(8080, () => {
    console.log('Server is listening');
})