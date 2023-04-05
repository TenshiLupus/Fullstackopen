import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

//these functions will still return promises as response to other promises, "then" will return a promise from another "then" promise

const getAll = () => {
  
  const requestPromise = axios.get(baseUrl);
  const responseData = requestPromise.then(response => response.data);

  return responseData
}

const create = newObject => {
  
  const requestPromise = axios.post(baseUrl, newObject);
  const responseData = requestPromise.then(response => response.data);
  return responseData;
}

const update = (id, newObject) => {
  
  const requestPromise = axios.put(`${baseUrl}/${id}`, newObject);
  const responseData = requestPromise.then(response => response.data);
  return responseData;
}

export default { getAll, create, update }