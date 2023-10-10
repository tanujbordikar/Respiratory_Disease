// import React, { useState } from 'react';

// function App() {
//   const [file, setFile] = useState(null);
//   const [predictions, setPredictions] = useState({ classpreds: '', confidence: '' });

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async () => {
//     const formData = new FormData();
//     formData.append('file', file);

//     const response = await fetch('http://localhost:5000/predict', {
//       method: 'POST',
//       body: formData,
//     });

//     if (response.ok) {
//       const data = await response.json();
//       setPredictions(data);
//     } else {
//       console.error('Error uploading file');
//     }
//   };

//   return (
//       <div style={{ position: "absolute", marginTop: "75px", fontSize: "20px" }}>

//     <div>
//     <h1>Respiratory Disease Predictor</h1>
//       <input type="file" accept=".wav" onChange={handleFileChange} />
//       <button onClick={handleSubmit}>Submit</button>
//       <br></br>
//       <br></br>
//       <div>
//         <h6>Predicted Class:</h6>
//         <p>{predictions.classpreds}</p>
//         <h6>Confidence:</h6>
//         <p>{predictions.confidence}</p>
//       </div>
//     </div>
//       </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import './Predict.css'; 

function App() {
  const [file, setFile] = useState(null);
  const [predictions, setPredictions] = useState({ classpreds: '', confidence: '' });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      setPredictions(data);
    } else {
      console.error('Error uploading file');
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Respiratory Disease Predictor</h1>
        <input type="file" accept=".wav" onChange={handleFileChange} />
        <button onClick={handleSubmit}>Submit</button>
        <div className="results">
          <h6>Predicted Class:</h6>
          <p>{predictions.classpreds}</p>
          <h6>Confidence:</h6>
          <p>{predictions.confidence}</p>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="audio-list">
        <h2>Sample Audio Files</h2>
        <ul>
          <li>
            <audio controls>
              <source src="https://www.kaggle.com/datasets/pvnbalaramamurthy/respiratory-test?select=106_2b1_Pl_mc_LittC2SE.wav" type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
          </li>
          <li>
            <audio controls>
              <source src="../../../audio/Healthy.wav" type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
          </li>
          {/* Add more sample audio files as needed */}
        </ul>
      </div>
    </div>
  );
}

export default App;
