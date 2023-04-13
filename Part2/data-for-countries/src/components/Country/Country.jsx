import React, { useEffect } from "react";
import weatherService from "../../service/weatherService";


const Country = ({country, mode, weather}) => {
    
    const { capital, area, languages, flags, name} = country
    
    if(mode === "detailed"){

        console.log("Country has rendered")
        

        return <>
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
        <p>temperature</p>
        </>
        
    }
    if (mode === "basic"){
        return <><h1>{name.common}</h1></>
    }
}

export default Country