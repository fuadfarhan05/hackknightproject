import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Brand.AI 🎬</h1>
        <h3>make adds on the go</h3>
        <div className="card">
          <div className="card-info">
            <p>Attach an image of your product</p>
            
            
          </div>
            

        </div>

            <div className= "InputText">
            <label for="productDescription" class="block text-lg font-medium text-gray-700 mb-2">
              
            </label>
            <input
                id="productDescription"
                rows="8"
                className="input-class"
                placeholder="Example: Make this picture into an ad."
                aria-label="Product Description Input Area"
            ></input>
        </div>

        <div className="button">
          <button className="button-style">Generate Ads</button>
        </div>
    

        
      </header>
    </div>
  );
}

export default App;
