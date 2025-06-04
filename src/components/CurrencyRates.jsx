import React, { useEffect, useState, useRef } from 'react';
import './CurrencyRates.css'; // CSS dosyasını içe aktarıyoruz

function CurrencyRates() {
  const [rates, setRates] = useState(null);
  const [goldPrice, setGoldPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const prevRates = useRef({ USDTRY: null, EURTRY: null, XAUTRY: null, EURUSD: null });

  const fetchRates = async () => {
    try {
      const res = await fetch('https://api.frankfurter.app/latest?from=USD&to=TRY,EUR');
      const data = await res.json();
      const usdTry = data.rates.TRY;
      const usdEur = data.rates.EUR;
      const eurTry = usdTry / usdEur;

      setRates({
        USDTRY: usdTry,
        EURTRY: eurTry,
        EURUSD: 1 / usdEur,
      });
    } catch (err) {
      console.error('Döviz bilgisi alınamadı:', err);
      setRates(null);
    }
  };

  const fetchGold = async () => {
    try {
      const res = await fetch('https://data-asg.goldprice.org/dbXRates/USD');
      const data = await res.json();
      const goldPriceUSD = data.items[0].xauPrice;
      const usdTry = rates ? rates.USDTRY : 1;
      const goldPriceTRY = (goldPriceUSD * usdTry) / 31.1035;
      setGoldPrice(goldPriceTRY);
    } catch (err) {
      console.error('Altın bilgisi alınamadı:', err);
      setGoldPrice(null);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  useEffect(() => {
    if (rates) {
      fetchGold();
      setLoading(false);
    }
  }, [rates]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchRates();
    }, 120000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (rates) {
      prevRates.current.USDTRY = rates.USDTRY;
      prevRates.current.EURTRY = rates.EURTRY;
      prevRates.current.EURUSD = rates.EURUSD;
    }
  }, [rates]);

  useEffect(() => {
    if (goldPrice) {
      prevRates.current.XAUTRY = goldPrice;
    }
  }, [goldPrice]);

  function getChangeIcon(key, value) {
    if (prevRates.current[key] === null) return null;
    if (value > prevRates.current[key]) {
      return <span className="change up">↑</span>;
    } else if (value < prevRates.current[key]) {
      return <span className="change down">↓</span>;
    } else {
      return <span className="change same">→</span>;
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <p className="loading-text">Yükleniyor...</p>
      </div>
    );
  }

  if (!rates || !goldPrice) {
    return (
      <div className="loading-container">
        <p className="error-text">Kur bilgisi alınamadı.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="title">Döviz ve Altın Kurları</h2>

      <div className="row">
        <div className="label">
          <span>💵</span>
          <span>Dolar - Türk Lirası</span>
        </div>
        <div className="value">
          {rates.USDTRY.toFixed(4)}
          {getChangeIcon('USDTRY', rates.USDTRY)}
        </div>
      </div>

      <div className="row">
        <div className="label">
          <span>💶</span>
          <span>Euro - Türk Lirası</span>
        </div>
        <div className="value">
          {rates.EURTRY.toFixed(4)}
          {getChangeIcon('EURTRY', rates.EURTRY)}
        </div>
      </div>

      <div className="row">
        <div className="label">
          <span>🥇</span>
          <span>Gram Altın - Türk Lirası</span>
        </div>
        <div className="value gold">
          {goldPrice.toFixed(2)}
          {getChangeIcon('XAUTRY', goldPrice)}
        </div>
      </div>

      <div className="row">
        <div className="label">
          <span>💱</span>
          <span>Euro - Dolar</span>
        </div>
        <div className="value">
          {rates.EURUSD.toFixed(4)}
          {getChangeIcon('EURUSD', rates.EURUSD)}
        </div>
      </div>
    </div>
  );
}

export default CurrencyRates;
