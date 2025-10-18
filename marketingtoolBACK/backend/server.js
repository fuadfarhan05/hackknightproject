const express = require("express");
const app = express();
require("dotenv").config();
// const multer = require("multer");
const cors = require("cors");
// const axios = require("axios");  

//Routes 
const userUpload = require('./Routes/userupload'); 

// Middleware
app.use(cors());
app.use(express.json());

// Port
const port = process.env.PORT || 6500;

// Basic route
app.get("/", (req, res) => {
  res.send("Backend for Marketing tool is running");
});

app.use('/api/', userUpload); 

// Start server
app.listen(port, () => {
  console.log(`Backend Server Running at http://localhost:${port}`);
});
