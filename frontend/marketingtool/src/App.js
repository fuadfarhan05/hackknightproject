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

            <div class= "InputText">
            <label for="productDescription" class="block text-lg font-medium text-gray-700 mb-2">
              
            </label>
            <textarea
                id="productDescription"
                rows="8"
                class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out resize-none text-gray-800"
                placeholder="Example: Make this picture into an ad."
                aria-label="Product Description Input Area"
            ></textarea>
        </div>
    

        
      </header>
    </div>
  );
}

export default App;
