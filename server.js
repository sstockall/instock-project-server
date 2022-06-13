const express = require('express');
const app = express();
const fs = require('fs'); 
const cors = require('cors'); 

//Middleware
app.use(express.json());
app.use(cors());

//Routes
const warehousesRoute = require('./routes/warehouses');
app.use('/warehouses', warehousesRoute);

const inventoriesRoute = require('./routes/inventories');
app.use('/inventories', inventoriesRoute);


app.listen(8080, () => {
    console.log('Server is listening');
})