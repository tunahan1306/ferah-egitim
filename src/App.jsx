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
      <div className="flex m-2">
        <div className="flex-1">
          <Countdown date="2025-06-17 11:00" />
          <AutoSlider />
          <Footer />
        </div>
        <div className='w-[350px] space-y-2'>
          <img class="h-auto max-w-full" src="/image copy.png" alt="image description" />
          <Weather />
          <CurrencyRates />
        </div>
      </div>

      

    </div>
  );
}

export default App;
