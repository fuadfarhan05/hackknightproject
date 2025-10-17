const express = require('express'); 
const app = express(); 
require('dotenv').config()

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
