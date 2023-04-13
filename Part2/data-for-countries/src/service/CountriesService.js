import axios from "axios";

const baseUrl = "https://restcountries.com/v3.1/all"

const getAll = () => {
    const requestPromise = axios.get(baseUrl);
    const responseData = requestPromise.then(response => response.data);
    return responseData;
}

export default {getAll}