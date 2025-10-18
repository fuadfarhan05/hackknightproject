import logo from './logo.svg';
import React from 'react';
import { useState } from 'react';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prompt, setPrompt] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    setImage(file);
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  }

  const handleSubmit = async () => {

    if(!image) {
      alert("please attach an image and prompt to proceed");
    }

    if(!prompt) {
      alert("please attach an image and prompt to proceed");
    }

    const PORT = process.env.PORT;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("prompt", prompt);

    try {
      const response = await fetch(`http://localhost:${PORT}/api/upload`, {
        method: "POST",
        body: formData,
      });

    }catch (error) {
      console.error("Error uploading:", error);
      alert("There was an error uploading your file.");
  }

  }



  return (
    <div className="App">
      <header className="App-header">
        <h1>Brand.AI 🎬</h1>
        <h3>make adds on the go</h3>
        <div className="card">
          <div className="card-info">
            <p>Attach an image of your product</p>
            <input type="file" accept="image/*" onChange={handleImageChange} />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{ width: "200px", height: "auto", marginTop: "10px", borderRadius: "8px" }}
              />
            )}
          </div>

            

        </div>

            <div className= "InputText">
            <label for="productDescription" class="block text-lg font-medium text-gray-700 mb-2">
              
            </label>
            <input
                id="productDescription"
                rows="8"
                className="input-class"
                onChange={handlePromptChange}
                placeholder="Example: Make this picture into an ad."
                aria-label="Product Description Input Area"
            ></input>
        </div>

        <div className="button">
          <button className="button-style" onClick={handleSubmit}>Generate Ads</button>
        </div>
    

        
      </header>
    </div>
  );
}

export default App;
