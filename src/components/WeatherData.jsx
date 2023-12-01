import React from "react";
import "./WeatherData.css";


const WeatherData = ({ weather, units }) => {
  // dynamic units for converting for wind and temp
  const unitTemperature = units === "metric" ? "°C" : "°F";
  const unitWind = units === "metric" ? "m/s" : "m/h";

  const cards = [
    {
      id: 1,
      title: "Min temp",
      data: weather.temp_min.toFixed(),
      unit: unitTemperature,
    },
    {
      id: 2,
      title: "Max temp",
      data: weather.temp_max.toFixed(),
      unit: unitTemperature,
    },

    {
      id: 3,
      title: "Pressure",
      data: weather.pressure,
      unit: "hPa",
    },
    {
      id: 4,
      title: "Feels like",
      data: weather.feels_like.toFixed(),
      unit: unitTemperature,
    },
    {
      id: 5,
      title: "Humidity",
      data: weather.humidity,
      unit: "%",
    },
    {
      id: 6,
      title: "Wind Speed",
      data: weather.speed.toFixed(),
      unit: unitWind,
    },
  ];
  return (
    <div className="main main-desc">
      {cards.map(({ id,  title, data, unit }) => (
        <div key={id} className="dataSection">
            <h5>{title}</h5>
          <h2>{`${data} ${unit}`}</h2>
        </div>
      ))}
    </div>
  );
};

export default WeatherData;
