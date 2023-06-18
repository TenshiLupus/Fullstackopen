import axios from "axios"
const baseUrl = "/api/notes"

//these functions will still return promises as response to other promises, "then" will return a promise from another "then" promise

let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getAll = () => {

	const requestPromise = axios.get(baseUrl)
	const responseData = requestPromise.then(response => response.data)

	return responseData
}

const create = async newObject => {
	const config = {
		headers: { Authorization: token }
	}

	const response = await axios.post(baseUrl, newObject, config)
	return response.data
}

const update = (id, newObject) => {

	const requestPromise = axios.put(`${baseUrl}/${id}`, newObject)
	const responseData = requestPromise.then(response => response.data)
	return responseData
}

export default { getAll, create, update, setToken }