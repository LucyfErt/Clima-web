import React, { useEffect, useState } from "react";
import "./HourlyForecast.css";

const HourlyForecast = ({ hour, temperature, weatherIcon }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {

    console.log("Componente HourlyForecast cargado");
    

    return () => {
      console.log("Componente HourlyForecast desmontado")
    };
  }, []);

  const toggleFavorite = () => {
    setIsFavorite((prevState) => !prevState);
  };

  return (
    <div className="hourly-forecast">
      <h3>{hour}</h3>
      {/* <img src="../imgs/Group 13 (1).png" alt="Weather Icon" /> */}
    </div>
  );
};

export default HourlyForecast;
