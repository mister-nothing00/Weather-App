import React, { useEffect } from "react";
import "./Weather.css";
import search_icon from "../Images/assets/search.png";
import Clear from "../Images/assets/clear.png";
import Cloud from "../Images/assets/cloud.png";
import Drizzle from "../Images/assets/drizzle.png";
import Humidity from "../Images/assets/humidity.png";
import Rain from "../Images/assets/rain.png";
import Snow from "../Images/assets/snow.png";
import Wind from "../Images/assets/wind.png";

export default function Weather() {
  const inputRef = React.useRef();
  const [weatherData, setWeatherData] = React.useState(false);

  const allIcons = {
    "01d": Clear,
    "01n": Clear,
    "02d": Cloud,
    "02n": Cloud,
    "03d": Cloud,
    "03n": Cloud,
    "04d": Drizzle,
    "04n": Drizzle,
    "09d": Rain,
    "09n": Rain,
    "10d": Rain,
    "10n": Rain,
    "13d": Snow,
    "13n": Snow,
  };

  

  const search = async (city) => {
    if (city === "") {
      alert("Inserisci nome città");
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY_ID}`;
      console.log("Fetching data from URL:", url);

      const response = await fetch(url);
      const data = await response.json();
      
      if(!response.ok){
        alert(data.message)
      }
      //console.log(data);

      const icon = allIcons[data.weather[0].icon] || Clear;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
        setWeatherData(false)
        console.error("Errore durante la ricerca meteo:", error);

    }
  };

  useEffect(() => {
    search("Rome");
  }, []);

  return (
    <div className="weather">
      <div className="search--bar">
        <input ref={inputRef} type="text" placeholder="Search " className="" />
        <img
          src={search_icon}
          alt="Search icon"
          className=""
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherData ?<>
        <img
            src={weatherData.icon}
            alt="Weather icon"
            className="weather--icon"
          />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather--data">
            <div className="col">
              <img src={Humidity} alt="Humidity icon" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={Wind} alt="Wind icon" />
              <div>
                <p>{weatherData.windSpeed}Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
     
      
      </>:<></>}
    
  
    </div>
  )
}
