import React, { useState } from "react";
import DailyForecast from "../../components/DailyForecast/DailyForecast";
import LocationSearch from "../../components/Location/LocationSearch";
import './WeatherApp.css';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [timezone, setTimezone] = useState("");

  const handleLocationChange = (newTimezone, newWeatherData) => {
    setTimezone(newTimezone);
    setWeatherData(newWeatherData);
    console.log("weatherData:", newWeatherData);
  };

  return (
    <div className="weather-app">
      <LocationSearch onLocationChange={handleLocationChange} />
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <DailyForecast weatherData={weatherData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
