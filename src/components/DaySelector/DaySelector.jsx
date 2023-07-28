import React, { useState } from "react";

const DaySelector = ({ days, onSelectDay }) => {
  const [selectedDay, setSelectedDay] = useState("");

  const handleDaySelection = (day) => {
    setSelectedDay(day);
    onSelectDay(day);
  };

  if (!Array.isArray(days)) {
    return null;
  }

  return (
    <div className="day-selector">
      {days.map((day) => (
        <div
          key={day}
          className={`day ${selectedDay === day ? "selected" : ""}`}
          onClick={() => handleDaySelection(day)}
        >
          {day}
        </div>
      ))}
    </div>
  );
};

export default DaySelector;
