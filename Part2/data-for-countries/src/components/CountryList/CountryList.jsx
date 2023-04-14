import React from "react";
import Country from "../Country/Country";

import Notification from "../Notification/Notification";
import DetailedCountry from "../DetailedCountry/DetailedCountry";

const nots = {
  limit: "Too many matches, be more specific",
};

const CountryList = ({ countryList, viewHandler, singleView, setWeather, weather}) => {

  if(countryList.length === 1){
    console.log('rendering singular', countryList)  
    return <><article>{countryList.map(country => <DetailedCountry key={country.cca2} country={country} setWeather={setWeather} weather={weather}/>)}</article></>
  
  }

  if(singleView){
    const filteredCountry = countryList.filter(country => country.cca2 === singleView)
    return <><article>{filteredCountry.map(country => <DetailedCountry key={country.cca2} country={country} setWeather={setWeather} weather={weather}/>)}</article></>
  
  }

  if (countryList.length > 10) {
    return <Notification message={nots.limit} />;
  } else {
    return (
      <section>
        {countryList.map((country) => (
          <>
            <Country key={country.cca2} country={country}/>
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
