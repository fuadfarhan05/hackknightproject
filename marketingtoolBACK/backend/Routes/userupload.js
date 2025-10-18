const express = require("express");
const multer = require("multer");
const axios = require("axios");

const userUpload = express.Router();

//set up multer here
const storage = multer.memoryStorage();
const upload = multer({ storage });

const GEM_API_KEY = process.env.GEMINI_API_KEY;

//GEMINI api endpoint.
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

userUpload.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const text = req.body.text;
    const fileBuffer = req.file.buffer;

    // Convert image to base64
    const base64Image = fileBuffer.toString("base64");

    // Prepare Gemini API request body
    const requestBody = {
      contents: [
        {
          parts: [
            { text: text },
            {
              inlineData: {
                mimeType: req.file.mimetype,
                data: base64Image,
              },
            },
          ],
        },
      ],
    };

    // Send to Gemini API
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEM_API_KEY}`,
      requestBody,
      {
        headers: { "Content-Type": "application/json" },
      },
    );

    res.json({
      message: "Image and text sent to Gemini API successfully",
      geminiData: response.data,
    });
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to send image to Gemini API" });
  }
});

module.exports = userUpload; 