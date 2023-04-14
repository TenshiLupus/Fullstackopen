import React, { useEffect } from "react";
import weatherService from "../../service/weatherService";

const DetailedCountry = ({ country, setWeather, weather }) => {
  const { capital, area, languages, flags, name} = country;

  useEffect(() => {
   
      weatherService.getWeatherData(country).then(weatherData => setWeather(weatherData))
}, [country])

  return (
    <>
      <h1>{name.common}</h1>
      <p>{capital}</p>
      <p>{area}</p>
      <br />
      <p>
        <b>Languages:</b>
      </p>
      <br />
      <ul>
        {Object.values(languages).map((language) => (
          <li>{language}</li>
        ))}
      </ul>
      <img src={flags.png} alt="flag" />
      <h2>Weather in {name.common}</h2>
      <p>temperature {weather && weather.main.temp} celcius</p>
      {weather && <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon"/>}
      <p>Wind {weather && weather.wind.speed} m/s</p>
    </>
  )
};

export default DetailedCountry;
