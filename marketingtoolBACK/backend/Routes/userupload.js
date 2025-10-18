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
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent";

userUpload.post("/upload", upload.single("image"), async (req, res) => {
  try { 

    if (!req.file) { 
      return res.status(400).json({ error: "No image provided" }); 
    } 

    if (!req.body.text){ 
      return res.status(400).json({ error: "No text/prompt provided "}); 
    }

    const prompt = req.body.text;
    const fileBuffer = req.file.buffer; 

    // handle api  key validation 
    if (!GEM_API_KEY){ 
      console.error("Gemini api key is not set"); 
      return res.status(500).json({ error : "API key not configured "}); 
    }

    // Convert image to base64
    const base64Image = fileBuffer.toString("base64");

    // Prepare Gemini API request body
    const requestBody = {
      contents: [
        {
          parts: [
            { text: prompt },
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

    console.log("sending request to API..."); 

    // Send to Gemini API
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEM_API_KEY}`,
      requestBody,
      {
        headers: { "Content-Type": "application/json" },
      },
    ); 
    console.log("API response recieved"); 

    let generatedImage = null;
    let mimeType = "image/png"; 

    const parts = response.data?.candidates?.[0]?.content?.parts || []; 

     for (let part of parts) {
      if (part.inlineData && part.inlineData.data) {
        generatedImage = part.inlineData.data;
        mimeType = part.inlineData.mimeType || "image/png";
        console.log("Found image data in response");
        break;
      }
    }

    if (!generatedImage) {  
      console.error("No image in response:", response.data);
      return res.status(500).json({
        error: "No image is able to be generated from API", 
        fullResponse: response.data,
        }); 
      }

      console.log("Image successfully generated and extracted");

    res.json({
      message: "Image and text sent to Gemini API successfully", 
      imageBase64: generatedImage, 
      mimeType: mimeType,
      geminiData: response.data,
    });
  } catch (err) {
    console.error("Error:", err.response?.data || err.message); 
    console.error("Full error:", err); 

    res.status(500).json({ error: "Failed to send image to Gemini API", details: err.response?.data?.error?.message || err.message });
  }
});

module.exports = userUpload; 