import React, { useEffect, useState, useRef } from 'react';

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
    } catch {
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
    } catch {
      setGoldPrice(null);
    }
  };

  // Verileri çekme fonksiyonu (döviz + altın)
  const fetchAllData = async () => {
    await fetchRates();
  };

  // İlk yüklemede ve rates değiştiğinde altın fiyatını da çek
  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    if (rates) {
      fetchGold();
      setLoading(false);
    }
  }, [rates]);

  // 2 dakikada bir otomatik yenileme
  useEffect(() => {
    const interval = setInterval(() => {
      fetchAllData();
    }, 120000); // 120.000 ms = 2 dakika

    return () => clearInterval(interval); // temizleme
  }, []);

  function getChangeIcon(key, value) {
    if (prevRates.current[key] === null) return null;
    if (value > prevRates.current[key]) {
      return <span className="text-green-500 ml-2">↑</span>;
    } else if (value < prevRates.current[key]) {
      return <span className="text-red-500 ml-2">↓</span>;
    } else {
      return <span className="text-gray-400 ml-2">→</span>;
    }
  }

  useEffect(() => {
    if (rates && goldPrice) {
      prevRates.current = {
        USDTRY: rates.USDTRY,
        EURTRY: rates.EURTRY,
        XAUTRY: goldPrice,
        EURUSD: rates.EURUSD,
      };
    }
  }, [rates, goldPrice]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 text-lg">Yükleniyor...</p>
      </div>
    );

  if (!rates || !goldPrice)
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-red-500 text-lg">Kur bilgisi alınamadı.</p>
      </div>
    );

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Döviz ve Altın Kurları
      </h2>

      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <div className="flex items-center space-x-2">
          <span className="text-xl">💵</span>
          <span className="font-medium text-gray-700">Dolar - Türk Lirası</span>
        </div>
        <span className="text-lg font-semibold text-blue-600 flex items-center">
          {rates.USDTRY.toFixed(4)}
          {getChangeIcon('USDTRY', rates.USDTRY)}
        </span>
      </div>

      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <div className="flex items-center space-x-2">
          <span className="text-xl">💶</span>
          <span className="font-medium text-gray-700">Euro - Türk Lirası</span>
        </div>
        <span className="text-lg font-semibold text-blue-600 flex items-center">
          {rates.EURTRY.toFixed(4)}
          {getChangeIcon('EURTRY', rates.EURTRY)}
        </span>
      </div>

      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <div className="flex items-center space-x-2">
          <span className="text-xl">🥇</span>
          <span className="font-medium text-gray-700">Gram Altın - Türk Lirası</span>
        </div>
        <span className="text-lg font-semibold text-yellow-600 flex items-center">
          {goldPrice.toFixed(2)}
          {getChangeIcon('XAUTRY', goldPrice)}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-xl">💱</span>
          <span className="font-medium text-gray-700">Euro - Dolar</span>
        </div>
        <span className="text-lg font-semibold text-blue-600 flex items-center">
          {rates.EURUSD.toFixed(4)}
          {getChangeIcon('EURUSD', rates.EURUSD)}
        </span>
      </div>

    </div>
  );
}

export default CurrencyRates;
