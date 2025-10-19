import logo from "./logo2.svg";
import React from "react";
import { useState } from "react"; 
import { 
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share"; 

import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [text, setText] = useState(""); 
  const [resultImg, setResultImg] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ NEW STATE

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

  const shareMessage = "Check out this AI-generated ad I made with GoAddy.io! 🚀 Create your own stunning ads instantly — no design skills needed."

  // ✅ Social handlers remain the same...
  const handleFacebookShare = () => {
    const url = encodeURIComponent(resultImg);
    const text = encodeURIComponent(shareMessage);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, "_blank");
  };

  const handleTwitterShare = () => {
    const url = encodeURIComponent(resultImg);
    const text = encodeURIComponent(shareMessage);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
  };

  const handleLinkedInShare = () => {
    const url = encodeURIComponent(resultImg);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  const handleWhatsAppShare = () => {
    const url = encodeURIComponent(resultImg);
    const text = encodeURIComponent(shareMessage);
    window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, "_blank");
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent("GoAddy.io Ad");
    const body = encodeURIComponent(`${shareMessage}\n\n${resultImg}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
  };

  const handleSubmit = async () => {
    if (!image || !text) {
      alert("Please attach both an image and prompt to proceed");
      return;
    }

    setLoading(true); // ✅ SHOW LOADING SCREEN

    const formData = new FormData();
    formData.append("image", image);
    formData.append("text", text);

    try {
      const response = await fetch(`https://backendforgoaddy.onrender.com/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Gemini res:", data);

      if (data.imageBase64 && data.mimeType){ 
        setResultImg(`data:${data.mimeType};base64,${data.imageBase64}`);
      } else { 
        alert("No image returned"); 
      }
    } catch (error) {
      console.error("Error uploading:", error);
      alert("There was an error uploading your file.");
    }

    setLoading(false); // ✅ HIDE LOADING SCREEN
  };

  return (
    <div className="App">
      {/* ✅ LOADING OVERLAY */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-box">
            <div className="spinner"></div>
            <p>Your GoAddy is thinking... your ad will be ready soon</p>
          </div>
        </div>
      )}

      <header className="App-header">
        <h1>GoAddy.photo 🎬</h1>
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
          <input
            id="productDescription"
            rows="8"
            className="input-class"
            value={text} 
            onChange={handlePromptChange}
            placeholder="Example: Create a viral instagram ad for our new sneakers targeting Gen Z."
          ></input>
        </div>

        {resultImg && (
          <div className="output-box" style={{ marginTop: "20px"}}>
            <h2>Your ad will show below:</h2> 
            <img 
              src={resultImg}
              alt="Generated Result"
              style={{ maxWidth: "400px", borderRadius: "8px" }}
            /> 

            <div className="share-buttons" style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
              <button onClick={handleFacebookShare}><FacebookIcon size={40} round /></button>
              <button onClick={handleTwitterShare}><TwitterIcon size={40} round /></button>
              <button onClick={handleLinkedInShare}><LinkedinIcon size={40} round /></button>
              <button onClick={handleWhatsAppShare}><WhatsappIcon size={40} round /></button>
              <button onClick={handleEmailShare}><EmailIcon size={40} round /></button>
            </div>
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
