const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
const cors = require('cors');
app.use(cors());
require('dotenv').config();
require('./db');
const routerPord = require('./ROUTER/Product');
const routerOrd = require('./ROUTER/Order');
const routerInv = require('./ROUTER/Inventory');
const routeUser  =require('./ROUTER/User');
require('mongoose-auto-increment');
app.use('/product' ,routerPord);
app.use('/order' ,routerOrd);
app.use('/inventory' ,routerInv);
app.use('/user' , routeUser);


const PORT = process.env.PORT || 8081;



app.get('/', (req,res)=>{
    res.send('API globel Working ');
})
app.listen(PORT , ()=>{

    console.log(`My Server start at port: ${PORT}`);
})

