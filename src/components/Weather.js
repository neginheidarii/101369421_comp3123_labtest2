import * as React from "react";
import { useEffect, useState } from "react";
import { fetchData } from "./WeatherComponent";
import bgImg from "../assets/weather.jpeg";
import WeatherData from "./WeatherData";
import "./Weather.css";

function Weather() {
  const [city, setCity] = useState("paris");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await fetchData(city, units);
        setWeather(data);
        setError(null);
      } catch (error) {
        setWeather(null);
        setError("Invalid city. Please enter a valid city name.");
      }
    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.target;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const handleSearchClick = () => {
    const inputElement = document.querySelector('input[name="city"]');
    const inputCity = inputElement.value.trim();

    if (inputCity) {
      setCity(inputCity);
      setError(null);
    } else {
      setError("Please enter a city name.");
    }
  };

  const enterKeyPresseds = (e) => {
    if (e.keyCode === 13) {
      const inputElement = document.querySelector('input[name="city"]');
      const inputCity = inputElement.value.trim();

      if (inputCity) {
        setCity(inputCity);
        setError(null);
      } else {
        setError("Please enter a city name.");
      }
    }
  };

  return (
    <div className="bg" style={{ backgroundImage: `url(${bgImg})` }}>
      <div className="overlay-section">
        {weather && (
          <div className="main-container">
            <div className="sec sec-inputs">
              <input
                onKeyDown={enterKeyPresseds}
                type="text"
                name="city"
                placeholder="Enter City Name"
              />
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
              <button onClick={handleSearchClick}>Search</button>
            </div>

            <div className="sec sec-temp">
              {error ? (
                <p style={{ color: "red" }}>{error}</p>
              ) : (
                <>
                  <div className="icon">
                    <h3>{`${weather.name}, ${weather.country}`}</h3>
                    <img src={weather.iconURL} alt="weather pic" />
                    <h3>{weather.description}</h3>
                  </div>
                  <div className="temperature">
                    <h1>{`${weather.temp.toFixed()} °${
                      units === "metric" ? "C" : "F"
                    }`}</h1>
                  </div>
                </>
              )}
            </div>

            {/* bottom description */}
            <WeatherData weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
