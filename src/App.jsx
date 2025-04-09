import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;

    const apiKey = 'f640bb5cf7fc045212add74e8a4a5a8d'; // ✅ API key should be a string

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=5&appid=${apiKey}`
      );
      const data = await response.json();

      if (data.list) {
        const result = data.list.map((item) => ({
          date: item.dt_txt.split(' ')[0],
          temp: `${Math.round(item.main.temp)}°C`,
          condition: item.weather[0].main
        }));
        setForecast(result);
      } else {
        setForecast(null);
        alert('City not found');
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
      alert('Something went wrong');
    }
  };

  return (
    <div className="container">
      <h1>Weather Dashboard</h1>
      <div className="search">
        <input
          type="text"
          value={city}
          placeholder="Enter city name"
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Forecast</button>
      </div>
      <div className="forecast">
        {forecast &&
          forecast.map((day, index) => (
            <div className="forecast-day" key={index}>
              <strong>{day.date}</strong>
              <div>{day.temp} - {day.condition}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
