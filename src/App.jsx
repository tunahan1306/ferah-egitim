import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Weather from './components/Weather';
import Countdown from './components/Countdown';
import CurrencyRates from './components/CurrencyRates';
import Footer from './components/Footer';
import AutoSlider from './components/AutoSlider';

function App() {
  return (
    <div>
      <div className="flex m-5">
        <div className="flex-1">
          <Countdown date="2025-06-17 11:00" />
        </div>
        <div className='w-[350px]'>
          <Weather />
        </div>
      </div>

      <div className="flex m-5">
        <div className="flex-1">
          <AutoSlider />
        </div>
        <div className='w-[350px]'>
          <CurrencyRates />
        </div>
      </div>

      <Footer />

    </div>
  );
}

export default App;
