import logo from './logo.svg';
import './App.css';
import MapView from './component/custom-tileLayer';
import MapContainer from './component/map';
import OpenMap from './component/open-map';
import Zoom12 from './component/zoom12';
import MapPDF from './component/open-map';
function App() {
  return (
    <div className="App" style={{width: "100%", height:"600px"}}>
      <MapPDF/>
    </div>
  );
}

export default App;
