import axios from "axios";

const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    const requestPromise = axios.get(baseUrl);
    const responseData = requestPromise.then(response => response.data);

    return responseData;
}

const create = newObject => {
    const requestPromise = axios.post(baseUrl, newObject);
    const responseData = requestPromise.then(response => response.data);
    return responseData;
}

const update = (id, newObject) => {
    const requestPromise = axios.get(`${baseUrl}/${id}`, newObject);
    const responseData = requestPromise.then(response => response.data);
    return responseData;
}

export default {getAll, create, update}