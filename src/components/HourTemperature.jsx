import React from "react";

function HourTemperature() {
  const date = new Date();
  const currentHour = date.getHours();

  return (
    <div className="hour-temp">
      <h1>Monday</h1>
      <div className="hour-block">
        <div className="content">
          <p>{currentHour}</p>
          <h2>28°C</h2>
        </div>
      </div>
    </div>
  );
}

export default HourTemperature;
