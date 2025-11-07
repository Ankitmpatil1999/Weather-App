import React, { useState } from 'react';
import './Weather.css';
import Icon_Humidity from './Immg/Humidity.png';
import Icon_Sun from './Immg/sunnew.jpg';
import Icon_Raining from './Immg/Raining.jpg';
import Icon_Cloud from './Immg/Cloud.jpg';
import Icon_Download from './Immg/Download.jpg';
import icon_Cloud from './Forcastimg/Cloud.jpg';
import icon_Rain from './Forcastimg/Raing.jpg';
import icon_Snow from './Forcastimg/Snow.jpg';
import icon_Sun from './Forcastimg/Sun.jpg';

const Weather = () => {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');

  const API_KEY = '457cafd824824b5c394585c7f2cdeeba';

  const handleSearch = async () => {
    if (!search) return;
    setError('');
    try {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`
      );
      if (!weatherRes.ok) throw new Error('City not found');
      const weatherData = await weatherRes.json();
      setWeather(weatherData);

   
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${API_KEY}&units=metric`
      );
      if (!forecastRes.ok) throw new Error('Forecast not found');
      const forecastData = await forecastRes.json();
      const dailyForecast = forecastData.list.filter(item =>
        item.dt_txt.includes('12:00:00')
      );
      setForecast(dailyForecast.slice(0, 7));
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast([]);
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear': return Icon_Sun;
      case 'Rain': return Icon_Raining;
      default: return Icon_Cloud;
    }
  };

  const getForecastIcon = (condition) => {
    switch (condition) {
      case 'Clear': return icon_Sun;
      case 'Rain': return icon_Rain;
      case 'Snow': return icon_Snow;
      default: return icon_Cloud;
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      {!weather && (
     <div className="Search">
      <input
      type="text"
      placeholder="Enter City Name"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
     />
     <button onClick={handleSearch}>Search</button>
      </div>
      )}

      {error && <p className="error">{error}</p>}

      {weather && (
        <div>
          <h1>{weather.name}</h1>
          <div className="temperature">
            <h1>{weather.main.temp}°C</h1>
            <img src={getWeatherIcon(weather.weather[0].main)} alt={weather.weather[0].main} />
          </div>

          <div className="row">
            <div className="Humidity">
              <img src={Icon_Humidity} alt="Humidity" />
              <p>{weather.main.humidity}%</p>
              <p>Humidity</p>
            </div>
            <div className="Wind">
              <img src={Icon_Download} alt="Wind Speed" />
              <p>{weather.wind.speed} m/s</p>
              <p>Wind</p>
            </div>
          </div>
        </div>
      )}

      {forecast.length > 0 && (
        <div className="row forecast">
          <ul>
            {forecast.map((day, index) => (
              <li className="Weather-item" key={index}>
                <p>{new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                <img
                  src={getForecastIcon(day.weather[0].main)}
                  alt={day.weather[0].main}
                 />
                <p className="temperature">{Math.round(day.main.temp)}°C</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Weather;
