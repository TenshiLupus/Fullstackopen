import { useEffect, useState } from 'react';

import CountriesService from './service/CountriesService';

import CountryForm from './components/CountryForm/CountryForm';
import CountryList from './components/CountryList/CountryList';


import './App.css';

const App = () => {
  const [filterBy, setFilter] = useState("")
  const [countries, setCountries] = useState([])
  // const [countryView, setCountryView] = useState(null)
  const [singleView, setSingleView] = useState(null)
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    CountriesService.getAll().then(response => {setCountries(response)})
    
  },[])

  const changeHandler = (event) => {
    const currentSearch = event.target.value
    setFilter(currentSearch)
    console.log(currentSearch);
  }

  const viewHandler = (id) => {
    setSingleView(id)
    setTimeout(() => {
      setSingleView(null)
    }, 5000)
  }

    const countriestoShow = filterBy ? countries.filter(country => country.name.common.toLowerCase().includes(filterBy.toLowerCase())) : countries
    
    return (
      <div className="App">
      <CountryForm searchQuery={filterBy} searchHandler={changeHandler}/>
      <CountryList countryList={countriestoShow} viewHandler={viewHandler} singleView={singleView} setWeather={setWeatherData} weather={weatherData}/>
    </div>
  );
}

export default App;
