import React, { useEffect, useState } from "react";
import "./DailyForecast.css";
import { ENV } from "../../config/env";

function DailyForecast({ city }) {
  const apiKey = ENV.API_KEY;

  const [weeklyForecast, setWeeklyForecast] = useState(null);

  // SE HACE LA LLAMADA A LA API
  useEffect(() => {
    const fetchWeeklyForecast = async () => {
      if (!city) return; // Si no hay ciudad, no se realiza la llamada a la API
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
      try {
        const response = await fetch(forecastUrl);
        const data = await response.json();
        console.log("API Response:", city, data);
        setWeeklyForecast(data);
      } catch (error) {
        console.error("Error en la llamada a la API:", error);
      }
    };
    fetchWeeklyForecast();
  }, [city, apiKey]); // Ejecutar el efecto solo cuando 'city' o 'apiKey' cambien
  // TERMINA LA LLAMADA A LA API

  // Función para agrupar los datos por fecha
  const groupForecastByDate = (forecastData) => {
    const groupedForecast = forecastData.reduce((result, item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!result[date]) {
        result[date] = [];
      }
      result[date].push(item);
      return result;
    }, {});

    return groupedForecast;
  };

  return (
    <div className="daily-forecast">
      {weeklyForecast === null ? (
        <p>Loading...</p>
      ) : (
        <div className="Dayli">
          {Object.entries(groupForecastByDate(weeklyForecast.list)).map(([date, forecasts]) => (
            <div key={date}>
              <h3>Date: {date}</h3>
              {forecasts.map((forecastItem) => (
                <div key={forecastItem.dt}>
                  <div className="weather">
                    <p>Time: {new Date(forecastItem.dt * 1000).toLocaleTimeString()}</p>
                    <p className="main">Temperature: {forecastItem.main.temp.toFixed()}°C</p>
                    <p className="mainsub">Feels Like: {forecastItem.main.feels_like.toFixed()}°C</p>
                  </div>
                  <div className="card2">
                    <div className="upper">
                      <div className="humiditytext">
                        <p>Humidity: {forecastItem.main.humidity}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DailyForecast;
