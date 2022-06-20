// import {RotationVideoPanel} from './Components/RotatingVideoPanel.js';
import RotationVideoPanel from './Components/RotatingVideoPanel';
// import MaterialPractice from './Components/MaterialPractice';
import ShadowMaskTest from './Components/ShadowMaskTest';
import RiverShader from './Components/RiverShader';
import './App.css';

function App() {
  return (
    <div className="App">
        <canvas id="bg"></canvas>
        <RiverShader/>
    </div>
  );
}

export default App;
