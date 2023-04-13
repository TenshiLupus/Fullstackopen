import React from "react";
import Country from "../Country/Country";
import Notification from "../Notification/Notification";

const nots = {
  limit: "Too many matches, be more specific",
};

const CountryList = ({ countryList, viewHandler, singleView, setWeather, weather}) => {

  if(singleView || countryList.length === 1){
    const filteredCountry = countryList.filter(country => country.cca2 === singleView)
    
    return <article>{filteredCountry.map(country => {
    setWeather(country)
    return <Country key={country.cca2} country={country} mode="detailed" weather={weather}/>
  })}</article>
  }

  if (countryList.length > 10) {
    return <Notification message={nots.limit} />;
  } else {
    return (
      <section>
        {countryList.map((country) => (
          <>
            <Country key={country.cca2} country={country} mode="basic"/>
            <button onClick={() => {
              viewHandler(country.cca2)
              console.log("Button triggered");
            }}>View</button>
          </>
        ))}
      </section>
    );
  }
};

export default CountryList;
