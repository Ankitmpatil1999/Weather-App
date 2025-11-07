import React, { useState, useEffect } from 'react';

const Weatherapp = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCities = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.api-ninjas.com/v1/city?name=San', {
        headers: {
          'X-Api-Key': 'YOUR_API_KEY' 
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch city data');
      }

      const data = await response.json();
      setCities(data); // data is an array of city objects
    } catch (error) {
      console.error('Error fetching cities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const handleChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div style={{ width: '300px', margin: 'auto', textAlign: 'center', paddingTop: '40px' }}>
      <h2>City Selector</h2>

      {loading ? (
        <p>Loading cities...</p>
      ) : (
        <select value={selectedCity} onChange={handleChange}>
          <option value="">Select a city</option>
          {cities.map((city, index) => (
            <option key={index} value={city.name}>
              {city.name}, {city.country}
            </option>
          ))}
        </select>
      )}

      {selectedCity && (
        <div style={{ marginTop: '20px' }}>
          <strong>Selected City:</strong> {selectedCity}
        </div>
      )}
    </div>
  );
};

export default Weatherapp;
