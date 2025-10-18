const express = require("express");
const app = express();
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const cors = require("cors");
const axios = require("axios");

// Middleware
app.use(cors());
app.use(express.json());

// Port
const port = process.env.PORT || 6500;

// Multer memory storage (do NOT save locally)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Basic route
app.get("/", (req, res) => {
  res.send("Backend for Marketing tool is running");
});

// Upload route: receive image + text from frontend
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const text = req.body.text;      // Text from frontend
    const fileBuffer = req.file.buffer;  // Image buffer from memory
    const fileName = req.file.originalname;

    // Send to Gemini API
    const geminiResponse = await axios.post(
      "", // Replace with actual endpoint
      {
        image: fileBuffer.toString("base64"), // Convert image to base64 if required
        text: text,
        filename: fileName
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
        },
      }
    );

    // Respond with Gemini data
    res.json({
      message: "Image and text sent to Gemini API successfully",
      geminiData: geminiResponse.data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send image to Gemini API" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Backend Server Running at http://localhost:${port}`);
});
