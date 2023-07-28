import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import DailyForecast from "../DailyForecast/DailyForecast";
import { ENV } from "../../config/env";
import { TiWeatherPartlySunny, TiWeatherStormy, TiWeatherCloudy, TiWeatherDownpour } from 'react-icons/ti';
import { TiThermometer, TiWaves, TiWeatherWindy} from 'react-icons/ti';
import "../Location/LocationSearh.css";


const initialState = {
  city: "Posadas",
  data: {},
  showForecast: false,
};

const locationReducer = (state, action)=>{
  switch(action.type){
    case "SET_CITY":
    return{ ...state , city:action.payload};
    case "SET_DATA":
      return{...state, data:action.payload};
      case "SHOW_FORECAST":
        return{...state, showForecast:true};
        case "HIDE_FORECAST":
          return{...state, showForecast:false};
          default:
            return state;
  }
};

function LocationSearch() {
 const [state , dispatch] = useReducer(locationReducer , initialState);
  const apiKey = ENV.API_KEY;


  const searchLocation = async () => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state.city}&units=metric&appid=${apiKey}`;
    console.log("city:",state.city )
    try {
      const response = await axios.get(weatherUrl);
      dispatch({type: "SET_DATA", payload: response.data});
      dispatch({type: "SHOW_FORECAST"});
    } catch (error) {
      console.error("ERROR EN LA LLAMDA EN EL LOCATION", error);
    }
    dispatch ({type:"SET_CITY", payload: state.city});
  };

  const handleSelectCity = (value) => {
    dispatch({ type: "SET_CITY", payload: value});
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      searchLocation();
    }
  };

  useEffect(() => {
    dispatch({type: "HIDE_FORECAST"});
  }, [state.city]);

  console.log("Data:", state.data);

  return (
    <div className="app">
      <div className="search">
        <input
          value={state.city}
          onChange={(event) => handleSelectCity(event.target.value)}
          onKeyUp={handleKeyUp}
          placeholder="Change Location"
          type="text"
          className="input"
        />
        <button onClick={searchLocation}></button>
      </div>
      <div className="container">
        <div className="top">
          
          
        </div>
        <div className="card-container">
        <div className="icon-card">
          {state.data.weather && (
            <>
            <div className="location">
            <p>{state.data.name}</p>
          </div>

              {state.data.weather[0].main === "Clouds" && <TiWeatherCloudy size={40} />}
              {state.data.weather[0].main === "Clear" && <TiWeatherPartlySunny size={40} />}
              {state.data.weather[0].main === "Rain" && <TiWeatherStormy size={40} />}
              {state.data.weather[0].main === "Mist" && <TiWeatherDownpour size={40} />}

                        <div className="temp">
            {state.data.main ? <h1>{state.data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {state.data.weather ? <p>{state.data.weather[0].main}</p> : null}
          </div>


            </>
          )}
        </div>

        {state.data.name && (
          <div className="card-2">
            <div className="feels">
              {state.data.main ? (
                <>
                <p>Feels Like</p>
                  <TiThermometer size={30} />
                  <p className="bold">{state.data.main.feels_like.toFixed()}°C</p>
                </>
              ) : null}
              
            </div>
            <div className="humidity">
              {state.data.main ? (
                <>
                <p>Humidity</p>
                 <TiWaves size={30} />
                  <p className="bold">{state.data.main.humidity}%</p>
                </>
              ) : null}
              
            </div>

            <div className="wind">
              {state.data.wind ? (
                <>
                <p>Wind Speed</p>
                  < TiWeatherWindy dsize={30} />
                  <p className="bold">{state.data.wind.speed.toFixed()} MPH</p>
                </>
              ) : null}
              
            </div>

          </div>
        )}
        </div>
        {state.showForecast && <DailyForecast city={state.city} />}
      </div>
      <div/>
    </div>
  );
}

export default LocationSearch;
