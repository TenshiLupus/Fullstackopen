import React from "react";
import CountryList from "../CountryList/CountryList";

const CountryForm = ({searchQuery, searchHandler}) => {
    return (
        <form>
            <label htmlFor="countryInput">Search Country</label>
            <input value={searchQuery} onChange={searchHandler} id="countryInput"/>
            
        </form>
    )
}

export default CountryForm;