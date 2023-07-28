import React, { useState, useEffect } from "react";

const TimeSelector = ({ onTimeSelect }) => {
  const [times, setTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.example.com/times");
        const data = await response.json();
        setTimes(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    onTimeSelect(time);
  };

  return (
    <div className="time-selector">
      <div className="btn-group">
      </div>
    </div>
  );
};

export default TimeSelector;
