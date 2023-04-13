import axios from "axios";

const getWeatherData = (country) => {
    console.log(country)
    const requestPromise = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${process.env.REACT_APP_WEATHER}`)
    const responseData = requestPromise.then(response => response.data)
    return responseData;
}

export default {getWeatherData}