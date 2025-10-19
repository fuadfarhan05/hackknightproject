import logo from "./logo.svg";
import React from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [text, setText] = useState(""); 
  // we need to create a new state show on the page as such 
  const [resultImg, setResultImg] = useState(null); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    setImage(file);
  };

  const handlePromptChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    if (!image || !text) {
      alert("Please attach both an image and prompt to proceed");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("text", text);

    try {
      const response = await fetch(`http://localhost:6500/upload`, {
        method: "POST",
        body: formData,
      });

      // debug comment here 
      // console.log("Image trying to process here: ");

      const data = await response.json();
      console.log("Gemini res:", data);

      if (data.imageBase64 && data.mimeType){ 
        setResultImg(`data:${data.mimeType};base64,${data.imageBase64}`);
      } else{ 
        alert("No image returned"); 
      } 

      alert("upload successful");
    } catch (error) {
      console.error("Error uploading:", error);
      alert("There was an error uploading your file.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>GoAddy.io 🎬</h1>
        <h3>Make Ads on the Go</h3>
        <div className="card">
          <div className="card-info">
            <p>Attach an image of your product</p>
            <input type="file" accept="image/*" onChange={handleImageChange} />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: "200px",
                  height: "auto",
                  marginTop: "10px",
                  borderRadius: "8px",
                }}
              />
            )}
          </div>
        </div>
        <div className="suggested">
          <p>Suggestions:</p>
          <button onClick={() => setText("retro style")}>retro style</button>
          <button onClick={() => setText("luxury style")}>luxury style</button>
          <button onClick={() => setText("old school style")}>old school style</button>
          <button onClick={() => setText("cyberpunk")}>cyberpunk</button>
          <button onClick={() => setText("minimalistic")}>minimalistic</button>

        </div>
        <div className="InputText">
          <label
            htmlFor="productDescription"
            className="block text-lg font-medium text-gray-700 mb-2"
          ></label>
          <input
            id="productDescription"
            rows="8"
            className="input-class"
            value={text} 
            onChange={handlePromptChange}
            placeholder="Example: Create a viral instagram ad for our new sneakers targeting Gen Z."
            aria-label="Product Description Input Area"
          ></input>
        </div> 

        {/*Handles the output so that the output should come right after the the uploaded image here. */}
        {resultImg && ( 
          <div className="output-box" style={{ marginTop: "20px"}}>
            <h2>Your ad will show below:</h2> 
            <img 
            src={resultImg}
            alt="Generated Result"
            style={{ maxWidth: "400px", borderRadius: "8px" }}/>
          </div>
        )}

        <div className="button">
          <button className="button-style" onClick={handleSubmit}>
            Generate Ads
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
