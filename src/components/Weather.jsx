import React, { useEffect, useState } from "react";
import './Weather.css'; // Yeni CSS dosyası

const iconMap = {
  "01d": "https://img.icons8.com/ios/100/000000/sun--v1.png",
  "01n": "https://img.icons8.com/ios/100/000000/moon-symbol.png",
  "02d": "https://img.icons8.com/ios/100/000000/partly-cloudy-day--v1.png",
  "02n": "https://img.icons8.com/ios/100/000000/partly-cloudy-night--v1.png",
  "03d": "https://img.icons8.com/ios/100/000000/cloud.png",
  "03n": "https://img.icons8.com/ios/100/000000/cloud.png",
  "04d": "https://img.icons8.com/ios/100/000000/cloud--v1.png",
  "04n": "https://img.icons8.com/ios/100/000000/cloud--v1.png",
  "09d": "https://img.icons8.com/ios/100/000000/rain.png",
  "09n": "https://img.icons8.com/ios/100/000000/rain.png",
  "10d": "https://img.icons8.com/ios/100/000000/rain--v1.png",
  "10n": "https://img.icons8.com/ios/100/000000/rain--v1.png",
  "11d": "https://img.icons8.com/ios/100/000000/storm.png",
  "11n": "https://img.icons8.com/ios/100/000000/storm.png",
  "13d": "https://img.icons8.com/ios/100/000000/snow.png",
  "13n": "https://img.icons8.com/ios/100/000000/snow.png",
  "50d": "https://img.icons8.com/ios/100/000000/fog-day.png",
  "50n": "https://img.icons8.com/ios/100/000000/fog-night.png",
};

function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = '91af4176c1d33681a78ae4848e7ba066';
  const city = "Üsküdar";

  useEffect(() => {
    let intervalId;

    async function getForecast() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&lang=tr&appid=${API_KEY}`
        );
        const data = await response.json();

        const grouped = {};
        data.list.forEach((item) => {
          const date = item.dt_txt.split(" ")[0];
          if (!grouped[date]) grouped[date] = [];
          grouped[date].push(item);
        });

        const dailyForecasts = Object.entries(grouped).map(([date, forecasts]) => ({
          date,
          temp: forecasts[0].main.temp,
          description: forecasts[0].weather[0].description,
          icon: forecasts[0].weather[0].icon,
        }));

        setWeather(dailyForecasts);
        setLoading(false);
      } catch (err) {
        console.error("Hava durumu alınamadı:", err);
        setLoading(false);
      }
    }

    getForecast();
    intervalId = setInterval(getForecast, 300000);
    return () => clearInterval(intervalId);
  }, [API_KEY, city]);

  if (loading) return <p className="weather-loading">Yükleniyor...</p>;
  if (!weather || weather.length === 0) return <p className="weather-loading">Veri alınamadı.</p>;

  const today = weather[0];

  return (
    <div className="weather-container">
      <h2 className="weather-title">{city} Bugünkü Hava Durumu</h2>
      <div className="weather-content">
        <p className="weather-description">{today.description}</p>
        <img
          src={iconMap[today.icon] || iconMap["01d"]}
          alt={today.description}
          className="weather-icon"
        />
        <p className="weather-temp">{Math.round(today.temp)}°C</p>
        <p className="weather-date">
          {new Date(today.date).toLocaleDateString("tr-TR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}

export default Weather;
