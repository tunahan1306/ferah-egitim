import React from 'react';
import './App.css';
import Weather from './components/Weather';
import Countdown from './components/Countdown';
import CurrencyRates from './components/CurrencyRates';
import Footer from './components/Footer';
import AutoSlider from './components/AutoSlider';

function App() {
  return (
    <div className="container">
      <div className="main-content">
        <div className="left-panel">
          <Countdown date="2025-06-17 11:00"/>
          <AutoSlider />
          <Footer />
        </div>
        <div className="right-panel">
          <img className="main-image" src="/image copy.png" alt="image description" />
          <Weather />
          <CurrencyRates />
        </div>
      </div>
    </div>
  );
}

export default App;
