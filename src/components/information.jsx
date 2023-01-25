import React, { useState } from "react";
import axios from "axios";
import clouds from "../img/clouds.png";
import { faSearch, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion/dist/es/index";

function Information() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=6f482e165f8ad7492280aafb22d35c57`;

  const textAnimation = {
    hidden: {
      x: -50,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 5,
    },
  };

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
      });
    }
  };

  function customTimestamp() {
    let date = new Date();

    let hh = normalizeValue(date.getHours());
    let mm = normalizeValue(date.getMinutes());

    return `${hh}:${mm}`;
  }

  function normalizeValue(value) {
    return value.toString().length > 1 ? value : `0${value}`;
  }

  return (
    <div className="information">
      <div className="date">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="temp-info"
        >
          {data.main !== undefined && <img src={clouds} alt="sky-meaning" />}
          {data.weather ? (
            <h2 className="description">{data.weather[0].description}</h2>
          ) : null}
          {data.name !== undefined && (
            <p className="city-name">{data.name} city</p>
          )}
        </motion.div>

        <div className="search">
          <div className="time-section">{customTimestamp()}</div>

          <div className="search-box">
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              onKeyPress={searchLocation}
              className="search-text"
              placeholder="Enter city name"
              type="text"
            />
            <a className="search-btn">
              <FontAwesomeIcon icon={faSearch} />
            </a>
          </div>
        </div>
        <div className="country-name">
          {data.main ? <h1>{data.main.temp}°C</h1> : null}
          {data.name !== undefined && (
            <FontAwesomeIcon className="location-icon" icon={faLocationDot} />
          )}
          {data.name !== undefined && <p> , {data.name} </p>}
          {data.sys ? <p> {data.sys.country}</p> : null}
        </div>
      </div>

      {data.name !== undefined && (
        <div className="additional-info">
          <div className="humidity">
            <p>Humidity</p>
            {data.main ? <h2>{data.main.humidity}%</h2> : null}
          </div>

          <div className="wind-speed">
            <p>Wind Speed</p>
            {data.wind ? <h2>{data.wind.speed} km/h</h2> : null}
          </div>

          <div className="air-pressure">
            <p className="air">Air pressure</p>
            {data.main ? <h2>{data.main.pressure} ps</h2> : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default Information;
