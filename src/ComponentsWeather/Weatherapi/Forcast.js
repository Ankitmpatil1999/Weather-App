import React from 'react'
import icon_Cloud from'../Components/Forcastimg/Cloud.jpg';
import icon_Raing from '../Components/Forcastimg/Raing.jpg';
import icon_Snow from '../Components/Forcastimg/Snow.jpg';
import icon_Stomandrain from '';
import icon_Sun from '../Components/Forcastimg/Sun.jpg';
import icon_Sunandrain from '../Components/Forcastimg/Sunandrain.jpg';
import icon_Suncloud from '../Components/Forcastimg/Suncloud.jpg';
import './Forcast.css';


const Forcast = () => {
    const [forecast, setForecast] = useState([]);

const getData = async () => {
  setError('');
  if (!city) return;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=457cafd824824b5c394585c7f2cdeeba&units=metric`
    );
    if (!response.ok) {
      throw new Error('City not found');
    }
    const jsonData = await response.json();
    setWeather(jsonData.city);
    
    // Filter for one forecast per day (around 12:00)
    const daily = jsonData.list.filter(item => item.dt_txt.includes("12:00:00"));
    setForecast(daily.slice(0, 7)); // Only first 7 days
  } catch (err) {
    setError(err.message);
  }
};

  return (
    <div> <div className='row'>
    <ul>
      {forecast.map((day, index) => (
        <li className='Weather-item' key={index}>
          <p className={`day${index + 1}`}>
            {new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'short' })}
          </p>
          <img
            src={
              day.weather[0].main === 'Clear'
                ? icon_Sun
                : day.weather[0].main === 'Rain'
                ? icon_Raing
                : day.weather[0].main === 'Snow'
                ? icon_Snow
                : icon_Cloud
            }
            alt="forecast icon"
          />
          <p className='temperature'>{Math.round(day.main.temp)}°C</p>
        </li>
      ))}
    </ul>
  </div>
  </div>
  )
}

export default Forcast
