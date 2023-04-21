import axios from "axios";

const baseUrl = "api/persons"

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

const replace = (id, replacement) => {
    const requestPromise = axios.put(`${baseUrl}/${id}`, replacement)
    const responseData = requestPromise.then(response => response.data)
    return responseData
}

const update = (id, newObject) => {
    const requestPromise = axios.get(`${baseUrl}/${id}`, newObject);
    const responseData = requestPromise.then(response => response.data);
    return responseData;
}

const remove = (id) => {
    const requestPromise = axios.delete(`${baseUrl}/${id}`);
    const responseData = requestPromise.then(response => response.data);
    return responseData;
}

export default {getAll, create, update, remove, replace}