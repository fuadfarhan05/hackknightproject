const express = require('express'); 
const app = express(); 
require('dotenv').config();  

// need multer which basically handles:Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency. 
const multer = require('multer'); 


//middleware to use two different ports. 
const cors = require("cors"); 

// setting up the middleware 
app.use(express.json()); 

// setting up the Ports here 
const port = process.env.PORT || 6500; 

// basic route 
app.get('/', (req, res) => { 
    res.send('Backend for Marketing tool is running'); 
}); 

app.listen(port, () => { 
    console.log(`Backend Server Running at http://localhost:${port}`); 
}); 
